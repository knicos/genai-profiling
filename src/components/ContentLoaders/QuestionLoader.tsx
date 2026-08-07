import { useCallback, useEffect, useState } from 'react';
import { Category, QuestionData } from '../Question/types';
import ContentLoader from '@genai-fi/base/components/ContentLoader';
import { ZipData } from '@genai-fi/base/util/zip';
import { Manifest } from './types';
import { useAtom, useSetAtom } from 'jotai';
import { profileAtom, profileURLAtom } from '@genaipg/state/profileState';

interface Props {
    lang: string;
    profile: string;
    onForms?: (forms: number[][]) => void;
    onQuestions?: (questions: QuestionData[]) => void;
    onError?: () => void;
}

const MANIFEST_URL = 'https://store.gen-ai.fi/classroom/manifest.json';
const LOCAL_PROFILE_KEY = 'custom';

export default function QuestionLoader({ lang, profile, onForms, onQuestions, onError }: Props) {
    const [manifest, setManifest] = useState<Manifest>();
    const [profileURL, setProfileURL] = useAtom(profileURLAtom);
    const setProfile = useSetAtom(profileAtom);

    useEffect(() => {

        if (profile === LOCAL_PROFILE_KEY && profileURL) {
            return;
        }


        fetch(MANIFEST_URL)
            .then((response) => {
                response
                    .json()
                    .then((m) => setManifest(m))
                    .catch(() => onError && onError());
            })
            .catch(() => onError && onError());
    }, [onError, profile, profileURL]);

    useEffect(() => {
        if (profile === LOCAL_PROFILE_KEY) return;

        if (manifest) {
            const m = manifest.profiles[lang]?.[profile];
            if (m) {
                setProfileURL(m.url);
            } else {
                if (onError) onError();
                console.error('no_profile', lang, profile);
            }
        }
    }, [manifest, lang, profile, onError, setProfileURL]);

    const doLoad = useCallback(
        async (data: ZipData) => {
            if (!("questions" in data)) {
                return;
            }

            const d = data.questions as {
                categories: Category[];
                forms: number[][];
            };

            setProfile(prev => ({
                ...(prev ?? {
                    slides: [],
                    categories: [],
                    forms: [],
                }),
                ...(onQuestions && { categories: d.categories }),
                ...(onForms && { forms: d.forms }),
            }));
        },
        [onForms, onQuestions, setProfile]
    );

    return profileURL ? (
        <ContentLoader content={[profileURL]} onLoad={doLoad} />
    ) : null;
}

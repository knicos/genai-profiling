import { useCallback, useEffect, useState } from 'react';
import { SlideMeta } from '../Slide/types';
import ContentLoader from '@genai-fi/base/components/ContentLoader';
import { ZipData } from '@genai-fi/base/util/zip';
import { addImage } from '@genaipg/services/images/images';
import { Manifest } from './types';
import { useAtom, useSetAtom } from 'jotai';
import { profileAtom, profileURLAtom } from '@genaipg/state/profileState';
import { Category } from '../Question/types';

interface Props {
    lang: string;
    profile: string;
    onError?: () => void;
}

const MANIFEST_URL = 'https://store.gen-ai.fi/classroom/manifest2.json';
const LOCAL_PROFILE_KEY = 'custom';

export default function ProfileLoader({ lang, profile, onError }: Props) {
    const [manifest, setManifest] = useState<Manifest>();
    const [profileURL, setProfileURL] = useAtom(profileURLAtom);
    const setLocalProfile = useSetAtom(profileAtom);

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
    }, [manifest, lang, profile, setProfileURL, onError]);

    const doLoad = useCallback(
        async (data: ZipData) => {

            if ('slides' in data) {
                setLocalProfile(prev => ({
                    ...(prev ?? { slides: [], images: {}, categories: [], forms: [] }),
                    slides: data.slides as SlideMeta[],
                }));
            }

            if (data.images) {
                data.images.forEach((content, name) => {
                    addImage(name, content);
                    setLocalProfile(prev => ({
                        ...(prev ?? { slides: [], images: {}, categories: [], forms: [] }),
                        images: {
                            ...(prev?.images ?? {}),
                            [name]: content,
                        },
                    }));
                });
            }

            if ("questions" in data) {
                const questionsData = data.questions as {
                    questions: Category[];
                    forms: number[][];
                };

                setLocalProfile(prev => ({
                    ...(prev ?? {
                        slides: [],
                        images: {},
                        categories: [],
                        forms: [],
                    }),
                    categories: questionsData.questions,
                    forms: questionsData.forms,
                }));
            }
            
        }, [setLocalProfile]);

    return profileURL ? (
        <ContentLoader content={[profileURL]} onLoad={doLoad} />
    ) : null;
}

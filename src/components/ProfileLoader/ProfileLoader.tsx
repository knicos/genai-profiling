import { useCallback, useEffect, useState } from 'react';
import { QuestionData } from '../Question/types';
import { SlideMeta } from '../Slide/types';
import ContentLoader from '@knicos/genai-base/components/ContentLoader';
import { ZipData } from '@knicos/genai-base/util/zip';
import { addImage } from '@genaipg/services/images/images';
import { Manifest } from './types';

interface Props {
    lang: string;
    profile: string;
    onSlides?: (slides: SlideMeta[]) => void;
    onForms?: (forms: number[][]) => void;
    onQuestions?: (questions: QuestionData[]) => void;
    onError?: () => void;
}

const MANIFEST_URL = 'https://store.gen-ai.fi/classroom/manifest.json';

export default function ProfileLoader({ lang, profile, onSlides, onForms, onQuestions, onError }: Props) {
    const [manifest, setManifest] = useState<Manifest>();
    const [profileURL, setProfileURL] = useState<string>();

    useEffect(() => {
        fetch(MANIFEST_URL)
            .then((response) => {
                response
                    .json()
                    .then((m) => setManifest(m))
                    .catch(() => onError && onError());
            })
            .catch(() => onError && onError());
    }, [onError]);

    useEffect(() => {
        if (manifest) {
            const m = manifest.profiles[lang]?.[profile];
            if (m) {
                setProfileURL(m.url);
            } else {
                if (onError) onError();
                console.error('no_profile', lang, profile);
            }
        }
    }, [manifest, lang, profile, onError]);

    const doLoad = useCallback(
        async (data: ZipData) => {
            if (onSlides && 'slides' in data) {
                onSlides(data.slides as SlideMeta[]);
            }
            if (data.images) {
                data.images.forEach((content, name) => {
                    addImage(name, content);
                });
            }
            if (onForms && onQuestions && 'questions' in data) {
                const d = data.questions as { questions: QuestionData[]; forms: number[][] };
                onQuestions(d.questions);
                onForms(d.forms);
            }
        },
        [onForms, onSlides, onQuestions]
    );

    return profileURL ? (
        <ContentLoader
            content={[profileURL]}
            onLoad={doLoad}
        />
    ) : null;
}

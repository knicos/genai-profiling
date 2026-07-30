import { Category, QuestionData } from "../Question/types";
import { SlideMeta } from "../Slide/types";

export interface LoadedQuestions {
    questions: Category[];
    forms: number[][];
}

export interface LocalProfile {
    images?: Record<string, string>,
    slides: SlideMeta[];
    questions: LoadedQuestions;
}

export interface ProfileMeta {
    questions: Category[] | QuestionData[];
    forms: number[][];
}

interface ManifestProfile {
    name: string;
    url: string;
}

interface ManifestProfiles {
    default: ManifestProfile;
    [key: string]: ManifestProfile;
}

export interface Manifest {
    version: number;
    profiles: {
        [key: string]: ManifestProfiles;
    };
}

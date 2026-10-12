import { Category } from "../Question/types";
import { SlideMeta } from "../Slide/types";

export interface ProfileMeta {
    images?: Record<string, string>,
    slides: SlideMeta[];
    categories: Category[];
    forms: (number | string)[][];
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

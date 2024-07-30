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

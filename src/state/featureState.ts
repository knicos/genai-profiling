import { atom } from 'jotai';

interface FeatureFlags {
    allowReportProblem?: boolean;
}

function isLocalOrStagingHost(hostname: string) {
    const host = hostname.toLowerCase();
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host.includes('staging');
}

export const featureFlagsAtom = atom(async () => {
    const localOrStaging = isLocalOrStagingHost(window.location.hostname);
    
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_API}/features/${localOrStaging ? 'classroom-staging' : 'classroom'}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch feature flags');
        }
        const data: {features: FeatureFlags} = await response.json();
        const features = data.features as FeatureFlags;
        return features;
    } catch {
        return {
            allowReportProblem: false,
        }
    }
})
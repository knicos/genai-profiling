import { ProfileMeta } from "@genaipg/components/ContentLoaders/types";
import { getCorrectAnswers } from "@genaipg/views/Teacher/userState";
import { atom } from "jotai";

export const profileURLAtom = atom<string>();
export const profileAtom = atom<ProfileMeta | undefined>(undefined);

export const chunkCategoriesAtom = atom((get) => {
    const profile = get(profileAtom);
    if (!profile) return [];

    const categories = getCorrectAnswers(profile.categories);
    const chunkSize = 1;
    const chunks = [];

    for (let i = 0; i < categories.length; i += chunkSize) {
        const chunk = categories.slice(i, i + chunkSize);
        chunks.push(chunk);
    }

    return chunks;
});
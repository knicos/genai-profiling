import { LocalProfile, ProfileMeta } from "@genaipg/components/ContentLoaders/types";
import { getCorrectAnswers } from "@genaipg/views/Teacher/userState";
import { atom } from "jotai";

export const profileURLAtom = atom<string>();
export const profileAtom = atom<LocalProfile | undefined>(undefined);
export const formAtom = atom<ProfileMeta>()

export const chunkCategoriesAtom = atom((get) => {
    const profile = get(profileAtom);
    if (!profile) return [];

    const categories = getCorrectAnswers(profile.questions.questions);
    const chunkSize = 1;
    const chunks = [];

    for (let i = 0; i < categories.length; i += chunkSize) {
        const chunk = categories.slice(i, i + chunkSize);
        chunks.push(chunk);
    }

    return chunks;
});
import { LocalProfile, ProfileMeta } from "@genaipg/components/ContentLoaders/types";
import { atom } from "jotai";

export const profileURLAtom = atom<string>();
export const profileAtom = atom<LocalProfile | undefined>(undefined);
export const formAtom = atom<ProfileMeta>()
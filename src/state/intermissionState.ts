import { atom } from "jotai";

export const intermissionAtom = atom<Record<number, string>>({});

export const updateIntermissionAtom = atom(
    null,
    (get, set, { id, value }: { id: number; value: string }) => {
        set(intermissionAtom, {
            ...get(intermissionAtom),
            [id]: value,
        });
    }
);
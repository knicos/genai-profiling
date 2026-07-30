import { atom } from "jotai";
import { CategoryEntry } from "@genaipg/protocol/protocol";
import { emitResponseEvent } from "@genaipg/services/responseLogger/events";

export const responseAtom = atom<Record<number, Record<number, string | string[]>>>({});

export const updateResponseAtom = atom(
    null, 
    (get, set, {categoryId, questionId, value} : { categoryId: number, questionId: number, value: string | string[]}) => {
        set(responseAtom, {
            ...get(responseAtom),
            [categoryId]: {
                ...get(responseAtom)[categoryId],
                [questionId]: value,
            },
        });

        emitResponseEvent(
            categoryId,
            questionId,
            value
        )
    }
)

export const updateAllResponseAtom = atom(
    null,
    (get, set, {categories} : { categories: CategoryEntry[] }) => {
        const next = { ...get(responseAtom) };

        for (const category of categories) {
            next[category.id] = {
                ...(next[category.id] ?? {}),
            };

            for (const question of category.questions) {
                next[category.id][question.id] = question.value;
            }
        }

        set(responseAtom, next);
    }
)


import { atom } from "jotai";
import { CategoryEntry } from "@genaipg/protocol/protocol";
import { emitResponseEvent } from "@genaipg/services/responseLogger/events";
import { Category } from "@genaipg/components/Question/types";

export const responseAtom = atom<Record<string, Record<string, string | string[]>>>({});

export const updateResponseAtom = atom(
    null,
    (get, set, { categoryId, questionId, value }: { categoryId: string, questionId: string, value: string | string[] }) => {
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
    (get, set, { categories }: { categories: CategoryEntry[] }) => {
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

const isAnswered = (value: string | string[] | undefined) =>
    value !== undefined &&
    value !== '' &&
    !(Array.isArray(value) && value.length === 0);

export const getCategoryStatus = (
    responses: Record<string, Record<string, string | string[]>>,
    category: Category
): 0 | 4 | 6 => {
    const categoryResponses = responses[category.id];

    if (!categoryResponses) return 0;

    const answeredCount = category.questions.filter(
        q => isAnswered(categoryResponses[q.id])
    ).length;

    if (answeredCount === 0) return 0;
    if (answeredCount === category.questions.length) return 6;

    return 4;
};

import { CategoryEntry } from "@genaipg/protocol/protocol";
import { emitResponseEvent } from "./events";

const state = new Map<string, Map<string, string | string[]>>();

export function updateResponse(categoryId: string, questionId: string, values: string | string[]) {
    if (!state.has(categoryId))
        state.set(categoryId, new Map());

    state.get(categoryId)!.set(questionId, values);

    emitResponseEvent(categoryId, questionId, values);
}

export function updateAllResponses(categories: CategoryEntry[]) {
    categories.forEach((c) => {
        c.questions.forEach((q) => {
            if (!state.has(c.id))
                state.set(c.id, new Map());
            state.get(c.id)!.set(q.id, q.value);
        });
    });
}

export function getResponse(categoryId: string, questionId: string): string | string[] {
    return state.get(categoryId)?.get(questionId) ?? '';
}
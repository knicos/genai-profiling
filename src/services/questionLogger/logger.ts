import { ResponseEntry } from '@genaipg/protocol/protocol';
import { emitResponseEvent } from './events';

const state = new Map<number, string>();

export function updateResponse(id: number, value: string) {
    state.set(id, value);
    emitResponseEvent(id, value);
}

export function updateAllResponses(responses: ResponseEntry[]) {
    responses.forEach((r) => {
        state.set(r.id, r.value);
    });
}

export function getResponse(id: number): string {
    return state.get(id) || '';
}

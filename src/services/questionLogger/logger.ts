import { ResponseEntry } from '@genaipg/protocol/protocol';
import { emitResponseEvent } from './events';

const state = new Map<string, string>();

export function updateResponse(id: string, value: string) {
    state.set(id, value);
    emitResponseEvent(id, value);
}

export function updateAllResponses(responses: ResponseEntry[]) {
    responses.forEach((r) => {
         state.set(r.id, Array.isArray(r.value) ? r.value.join(',') : r.value);
    });
}

export function getResponse(id: string): string {
    return state.get(id) || '';
}

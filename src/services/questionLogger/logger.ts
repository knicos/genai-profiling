import { emitResponseEvent } from './events';

const state = new Map<number, string>();

export function updateResponse(id: number, value: string) {
    state.set(id, value);
    emitResponseEvent(id, value);
}

export function getResponse(id: number): string {
    return state.get(id) || '';
}

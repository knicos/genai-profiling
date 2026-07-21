import EE from 'eventemitter3';

const ee = new EE();

export function addResponseListener(handler: (categoryId: number, questionId: number, values: string | string[]) => void) {
    ee.on(`response`, handler)
}

export function removeResponseListener(handler: ( categoryId: number, questionId: number, values: string | string[]) => void) {
    ee.off(`response`, handler)
}

export function emitResponseEvent(categoryId: number, questionId: number, values: string | string[]) {
    ee.emit(`response`, categoryId, questionId, values);
}


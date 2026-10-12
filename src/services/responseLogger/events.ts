import EE from 'eventemitter3';

const ee = new EE();

export function addResponseListener(handler: (categoryId: string, questionId: string, values: string | string[]) => void) {
    ee.on(`response`, handler)
}

export function removeResponseListener(handler: ( categoryId: string, questionId: string, values: string | string[]) => void) {
    ee.off(`response`, handler)
}

export function emitResponseEvent(categoryId: string, questionId: string, values: string | string[]) {
    ee.emit(`response`, categoryId, questionId, values);
}


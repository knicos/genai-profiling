import EE from 'eventemitter3';

const ee = new EE();

export function addResponseListener(handler: (id: number, value: string) => void) {
    ee.on(`response`, handler);
}

export function removeResponseListener(handler: (id: number, value: string) => void) {
    ee.off(`response`, handler);
}

export function emitResponseEvent(id: number, value: string) {
    ee.emit('response', id, value);
}

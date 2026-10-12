import EE from 'eventemitter3';

const ee = new EE();

export function addResponseListener(handler: (id: string, value: string) => void) {
    ee.on(`response`, handler);
}

export function removeResponseListener(handler: (id: string, value: string) => void) {
    ee.off(`response`, handler);
}

export function emitResponseEvent(id: string, value: string) {
    ee.emit('response', id, value);
}

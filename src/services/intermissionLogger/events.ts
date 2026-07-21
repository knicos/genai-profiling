import EE from 'eventemitter3';

const ee = new EE();

export function emitIntermissionEvent(id: number, value: string) {
    ee.emit('intermission', id, value);
}
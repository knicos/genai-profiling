import { useEffect } from 'react';
import { addResponseListener, removeResponseListener } from './events';

export function useQuestionLogger(callback: (id: number, value: string) => void) {
    useEffect(() => {
        const handler = callback;
        addResponseListener(handler);
        return () => {
            removeResponseListener(handler);
        };
    }, [callback]);
}

import { useEffect } from "react";
import { addResponseListener, removeResponseListener } from "./events";

export function useResponseLogger(callback: (categoruId: number, questionId: number, values: string | string[]) => void) {
    useEffect(() => {
        const handler = callback;
        addResponseListener(handler);
        return() => {
            removeResponseListener(handler);
        }
    }, [callback]);
}
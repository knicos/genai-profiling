import { useEffect } from "react";
import { addResponseListener, removeResponseListener } from "./events";

export function useResponseLogger(callback: (categoruId: string, questionId: string, values: string | string[]) => void) {
    useEffect(() => {
        const handler = callback;
        addResponseListener(handler);
        return() => {
            removeResponseListener(handler);
        }
    }, [callback]);
}
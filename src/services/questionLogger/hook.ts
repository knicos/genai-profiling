import { useEffect, useState } from 'react';
import { addResponseListener, removeResponseListener } from './events';
import { getResponse } from './logger';
import { QuestionData } from '@genaipg/components/Question/types';

export function useQuestionLogger(callback: (id: number, value: string) => void) {
    useEffect(() => {
        const handler = callback;
        addResponseListener(handler);
        return () => {
            removeResponseListener(handler);
        };
    }, [callback]);
}

function getAllResponses(questions: QuestionData[]) {
    const res = questions.map((q) => getResponse(q.id));
    return res;
}

export function useQuestionResponses(questions: QuestionData[]) {
    const [responses, setResponses] = useState<string[]>([]);
    useEffect(() => {
        const handler = () => {
            setResponses(getAllResponses(questions));
        };
        addResponseListener(handler);
        setResponses(getAllResponses(questions));
        return () => {
            removeResponseListener(handler);
        };
    }, [questions]);

    return responses;
}

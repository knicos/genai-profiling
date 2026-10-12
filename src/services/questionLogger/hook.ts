import { useEffect, useState } from 'react';
import { addResponseListener, removeResponseListener } from './events';
import { getResponse } from './logger';
import { Category, QuestionData } from '@genaipg/components/Question/types';

export function useQuestionLogger(callback: (id: string, value: string) => void) {
    useEffect(() => {
        const handler = callback;
        addResponseListener(handler);
        return () => {
            removeResponseListener(handler);
        };
    }, [callback]);
}

function getAllResponses(questions: QuestionData[] | Category[] ) {
    const res = questions.map((q) => getResponse(q.id));
    return res;
}

export function useQuestionResponses(questions: QuestionData[] | Category[] ) {
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

function getAllResp(category: Category) {
    const res = category.questions.map((q) => getResponse(q.id));
    return res;
}

export function useCategoryResponses(category: Category) {
    const [responses, setResponses] = useState<string[]>([]);

    useEffect(() => {
        const handler = () => {
            setResponses(getAllResp(category));
        };

        addResponseListener(handler);
        setResponses(getAllResp(category));
        return () => {
            removeResponseListener(handler);
        };

    }, [category])

    return responses;
}

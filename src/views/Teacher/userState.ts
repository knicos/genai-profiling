import { Category, QuestionData } from '@genaipg/components/Question/types';
import { SlideMeta } from '@genaipg/components/Slide/types';
import { ResponseData } from '@genaipg/protocol/protocol';
import { emitIntermissionEvent } from '@genaipg/services/intermissionLogger/events';
import { useCallback, useEffect } from 'react';

export interface UserState {
    name: string;
    responses: Map<number, Map<number, string | string[]>>;
    intermission: Map<number, string>;
}

const state = new Map<string, UserState>();

const questionRecord = new Map<number, QuestionData>();

interface LogBase {
    type: 'user' | 'teacher';
}

interface LogUserData extends ResponseData, LogBase {
    type: 'user';
    className: string;
    username: string;
    userId: string;
    slide?: SlideMeta;
}

interface LogTeacherData extends LogBase {
    type: 'teacher';
    className: string;
    form: number;
    slide?: SlideMeta;
    timestamp: number;
    date: string;
}

type LogData = LogUserData | LogTeacherData;

const logs: LogData[] = [];

export function addUserResponse(className: string, id: string, data: ResponseData, slide?: SlideMeta) {
    const userState = state.get(id) || {
        name: '',
        responses: new Map<number, Map<number, string | string[]>>(),
        intermission: new Map<number, string>(),
    };

    logs.push({
        type: 'user',
        className,
        username: userState.name,
        userId: id,
        category: data.category,
        question: data.question,
        value: data.value,
        timestamp: data.timestamp,
        date: data.date,
        form: data.form,
        slide,
    });

    if (!userState.responses.has(data.category))
        userState.responses.set(data.category, new Map());

    const questionId = typeof data.question === 'number' ? data.question : data.question.id;
    userState.responses.get(data.category)!.set(questionId, data.value);

    if (typeof data.question !== 'number')
        questionRecord.set(questionId, data.question);

    state.set(id, userState);
}

export function addUserIntermission(id: string, checkpointId: number, value: string) {
    const userState = state.get(id) || {
        name: '',
        responses: new Map<number, Map<number, string | string[]>>(),
        intermission: new Map<number, string>(),
    };
    userState.intermission.set(checkpointId, value);
    state.set(id, userState);
    emitIntermissionEvent(checkpointId, value);
}

export function addTeacherLog(className: string, form: number, slide?: SlideMeta) {
    logs.push({
        type: 'teacher',
        className,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        form,
        slide,
    });
}

export function addUserName(id: string, name: string) {
    const userState = state.get(id) || {
        name,
        responses: new Map<number, Map<number, string | string[]>>(),
        intermission: new Map<number, string>(),
        log: [],
    };
    userState.name = name;
    state.set(id, userState);
}

export function dumpUserData() {
    const result = [];
    for (const [key, value] of state) {
        result.push({
            id: key,
            name: value.name,
            responses: Array.from(value.responses).map((r) => ({
                question: questionRecord.get(r[0]) || r[0],
                value: r[1],
            })),
        });
    }
    return {
        responses: result,
        logs: logs,
    };
}

type SerializedState = ReturnType<typeof dumpUserData>;

export function usePersistentData(code: string) {
    useEffect(() => {
        const data = window.sessionStorage.getItem(`genai-pg-data-${code}`);
        if (data) {
            const pdata = JSON.parse(data) as SerializedState;
            pdata.responses.forEach((u) => {
                addUserName(u.id, u.name);
                const userState = state.get(u.id) || {
                    name: '',
                    responses: new Map<number, Map<number, string | string[]>>(),
                    intermission: new Map<number, string>(),
                    log: [],
                };

                u.responses.forEach((r) => {
                    userState.responses.set(typeof r.question === 'number' ? r.question : r.question.id, r.value);
                    if (typeof r.question !== 'number') {
                        questionRecord.set(r.question.id, r.question);
                    }
                });

                state.set(u.id, userState);
            });
            logs.splice(0, logs.length);
            pdata.logs.forEach((l) => logs.push(l));
        }

        return () => {
            window.sessionStorage.setItem(`genai-pg-data-${code}`, JSON.stringify(dumpUserData()));
        };
    }, [code]);
    return useCallback(() => {
        window.sessionStorage.setItem(`genai-pg-data-${code}`, JSON.stringify(dumpUserData()));
    }, [code]);
}

export function getQuestionData(id: number): QuestionData {
    return questionRecord.get(id) || { type: 'message', text: '', id: -1 };
}

export function getUserData() {
    return Array.from(state.values());
}

export function getFakeUserData(size: number) {
    const fake: UserState[] = [];
    for (let i = 0; i < size; ++i) {
        fake.push({ name: `Name${i}`, responses: new Map<number, Map<number, string | string[]>>(), intermission: new Map<number, string>() });
    }
    return fake;
}

export function getUserName(id: string) {
    const d = state.get(id);
    if (d) return d.name;
    return '';
}

export function getUserResponses(id: string) {
    const d = state.get(id);
    if (d) {
        return d.responses;
    }
    return null;
}

export function getAllUsers() {
    return Array.from(state.keys());
}

export function getIntermissionAverage(checkpointId: number): number {
    const users = getAllUsers();

    const values = Array.from(state.values())
        .map(u => u.intermission?.get(checkpointId))
        .filter((v): v is string => v !== undefined);

    if (values.length === 0) return 0;

    const sum = values.reduce((acc, value) => acc + Number(value), 0);

    return sum / users.length;
}

function scoreQuestion(question: QuestionData, response: string | string[]) {
    switch (question.type) {
        case 'slider': {
            if (question.correct) {
                const guess = Number(response);
                const range = question.max - question.min;

                return Math.max(
                    0,
                    1 - Math.abs((guess - question.correct) / range)
                );
            }
            return 0;
        } case 'singlechoice': {
            if (question.correct) {
                return response === question.correct ? 1 : 0;
            }
            return 0;
        } case 'multichoice': {
            if (question.correct) {
                const guess = new Set(Array.isArray(response) ? response : [response]);
                const correct = new Set(Array.isArray(question.correct) ? question.correct : [question.correct]);

                const intersection = [...guess].filter(x => correct.has(x)).length;

                const union = guess.size + correct.size - intersection;
                return union === 0 ? 0 : intersection / union;
            }

            return 0;
        }
        default:
            return 0;
    }
}

function scoreCategory(category: Category, responses: Map<number, string | string[]>) {
    if (!category.questions.length) return 0;

    let total = 0;

    for (const q of category.questions) {
        const response = responses.get(q.id);
        if (!response) continue;

        total += scoreQuestion(q, response);
    }

    return total / category.questions.length;
}

export function getIntermissionCorrect(categories: Category[] | undefined) {
    if (!categories?.length) {
        return { correct: 0, total: 0 };
    }

    const users = Array.from(state.values()).filter(user =>
        categories.some(c => user.responses.has(c.id))
    );

    if (!users.length) {
        return { correct: 0, total: categories.length };
    }

    let totalCorrect = 0;

    for (const user of users) {
        let correct = 0;

        for (const category of categories) {
            const responses = user.responses.get(category.id);
            if (!responses) continue;

            const score = scoreCategory(category, responses);
            if (score >= 0.85) correct++;
        }

        totalCorrect += correct;
    }

    return {
        correct: Math.round(totalCorrect / users.length),
        total: categories.length,
    };
}
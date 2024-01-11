import { QuestionData } from '@genaipg/components/Question/types';
import { SlideMeta } from '@genaipg/components/Slide/types';
import { ResponseData } from '@genaipg/protocol/protocol';

interface UserState {
    name: string;
    responses: Map<number, string>;
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
        responses: new Map<number, string>(),
        log: [],
    };

    logs.push({
        type: 'user',
        className,
        username: userState.name,
        userId: id,
        question: data.question,
        value: data.value,
        timestamp: data.timestamp,
        date: data.date,
        form: data.form,
        slide,
    });
    if (typeof data.question === 'number') {
        userState.responses.set(data.question, data.value);
    } else {
        userState.responses.set(data.question.id, data.value);
        questionRecord.set(data.question.id, data.question);
    }
    state.set(id, userState);
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
        responses: new Map<number, string>(),
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

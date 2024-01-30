import useRandom from '@genaipg/hooks/random';
import { EventProtocol } from '@genaipg/protocol/protocol';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePeer from '@genaipg/hooks/peer';
import Loading from '@genaipg/components/Loading/Loading';
import EnterUsername from './EnterUsername';
import { QuestionData } from '@genaipg/components/Question/types';
import Form from '@genaipg/components/Form/Form';
import { useQuestionLogger } from '@genaipg/services/questionLogger/hook';
import { useChangeableID } from '@genaipg/hooks/id';
import { useSetRecoilState } from 'recoil';
import { availableUsers } from '@genaipg/state/sessionState';
import { updateAllResponses } from '@genaipg/services/questionLogger/logger';

const USERNAME_KEY = 'genai_pg_username';
const QUESTION_URL = '/data/questions.json';

function loadUser() {
    const name = window.sessionStorage.getItem(USERNAME_KEY);
    return name || undefined;
}

function filterQuestions(questions: QuestionData[], form: number[]) {
    const set = new Map<number, QuestionData>();
    questions.forEach((q) => {
        set.set(q.id, q);
    });
    const result: QuestionData[] = [];
    form.forEach((f) => {
        const q = set.get(f);
        if (q) {
            result.push(q);
        }
    });
    return result;
}

export function Component() {
    const { code } = useParams();
    const [username, setUsername] = useState<string | undefined>(loadUser);
    const MYCODE = useRandom(10);
    const [MYID, changeId] = useChangeableID(8);
    const [questions, setQuestions] = useState<QuestionData[]>();
    const [forms, setForms] = useState<number[][]>();
    const [currentForm, setCurrentForm] = useState(0);
    const setAvailable = useSetRecoilState(availableUsers);
    const [count, increment] = useReducer((old) => ++old, 0);

    useEffect(() => {
        fetch(QUESTION_URL).then((response) => {
            response.json().then((data) => {
                setQuestions(data.questions);
                setForms(data.forms);
            });
        });
    }, []);

    const onData = useCallback(
        (data: EventProtocol) => {
            console.log('GOT DATA', data);
            if (data.event === 'pg:changeform') {
                setCurrentForm(data.form);
                increment();
            } else if (data.event === 'pg:users') {
                setAvailable(data.users);
            } else if (data.event === 'pg:responses') {
                updateAllResponses(data.responses);
            }
        },
        [setAvailable]
    );

    const { ready, send } = usePeer<EventProtocol>({ code: code && `pg-${MYCODE}`, server: `pg-${code}`, onData });

    const logFn = useCallback(
        (id: number, value: string) => {
            if (send && username && questions) {
                send({
                    event: 'pg:response',
                    question: questions.find((v) => v.id === id) || id,
                    value,
                    timestamp: Date.now(),
                    date: new Date().toISOString(),
                    username,
                    userId: MYID,
                    form: currentForm,
                });
            }
        },
        [send, username, currentForm, questions, MYID]
    );
    useQuestionLogger(logFn);

    useEffect(() => {
        if (username && send && ready) {
            window.sessionStorage.setItem(USERNAME_KEY, username);
            send({ event: 'pg:reguser', username, id: MYID });
        }
    }, [username, send, ready, MYID]);

    const doDone = useCallback(
        (state: boolean) => {
            if (send) {
                send({ event: 'pg:done', done: state, id: MYID });
            }
        },
        [send, MYID]
    );

    const selectedQuestions = useMemo(() => {
        return questions && forms && currentForm >= 0 ? filterQuestions(questions, forms[currentForm]) : [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions, forms, currentForm, count]);

    return (
        <Loading loading={!ready || !questions || !forms}>
            {!username && (
                <EnterUsername
                    onUsername={setUsername}
                    onChangeId={changeId}
                />
            )}
            {username && forms && questions && (
                <Form
                    onDone={doDone}
                    key={`form-${currentForm}`}
                    questions={selectedQuestions}
                />
            )}
        </Loading>
    );
}

import useRandom from '@genaipg/hooks/random';
import { EventProtocol } from '@genaipg/protocol/protocol';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { DataConnection } from 'peerjs';
import usePeer from '@genaipg/hooks/peer';
import Loading from '@genaipg/components/Loading/Loading';
import EnterUsername from './EnterUsername';
import { QuestionData } from '@genaipg/components/Question/types';
import Form from '@genaipg/components/Form/Form';
import { useQuestionLogger } from '@genaipg/services/questionLogger/hook';
import randomId from '@genaipg/util/randomId';

const USERNAME_KEY = 'genai_pg_username';
const QUESTION_URL = '/data/questions.json';
const MYID = randomId(8);

function loadUser() {
    const name = window.sessionStorage.getItem(USERNAME_KEY);
    return name || undefined;
}

function filterQuestions(questions: QuestionData[], form: number[]) {
    const set = new Set(form);
    return questions.filter((q) => set.has(q.id));
}

export function Component() {
    const { code } = useParams();
    const [username, setUsername] = useState<string | undefined>(loadUser);
    const MYCODE = useRandom(10);
    const [questions, setQuestions] = useState<QuestionData[]>();
    const [forms, setForms] = useState<number[][]>();
    const [currentForm, setCurrentForm] = useState(0);

    useEffect(() => {
        fetch(QUESTION_URL).then((response) => {
            response.json().then((data) => {
                setQuestions(data.questions);
                setForms(data.forms);
            });
        });
    }, []);

    const onData = useCallback((data: EventProtocol) => {
        console.log('GOT DATA', data);
        if (data.event === 'pg:changeform') {
            setCurrentForm(data.form);
        }
    }, []);

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
        [send, username, currentForm, questions]
    );
    useQuestionLogger(logFn);

    useEffect(() => {
        if (username && send && ready) {
            window.sessionStorage.setItem(USERNAME_KEY, username);
            send({ event: 'pg:reguser', username, id: MYID });
        }
    }, [username, send, ready]);

    return (
        <Loading loading={!ready || !questions || !forms}>
            {!username && <EnterUsername onUsername={setUsername} />}
            {username && forms && questions && (
                <Form questions={currentForm >= 0 ? filterQuestions(questions, forms[currentForm]) : []} />
            )}
        </Loading>
    );
}
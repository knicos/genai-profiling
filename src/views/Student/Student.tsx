import { useCallback, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@genaipg/components/Loading/Loading';
import EnterUsername from './EnterUsername';
import { QuestionData } from '@genaipg/components/Question/types';
import Form from '@genaipg/components/Form/Form';
import { useChangeableID } from '@genaipg/hooks/id';
import { useSetRecoilState } from 'recoil';
import { availableUsers } from '@genaipg/state/sessionState';
import StudentProtocol from './StudentProtocol';
import { ContentLoader, ZipData } from '@knicos/genai-base';

const USERNAME_KEY = 'genai_pg_username';
const QUESTION_URL = 'https://store.gen-ai.fi/classroom/profile1_fi.zip';

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
    const [MYID, changeId] = useChangeableID(8);
    const [questions, setQuestions] = useState<QuestionData[]>();
    const [forms, setForms] = useState<number[][]>();
    const [currentForm, setCurrentForm] = useState(-1);
    const setAvailable = useSetRecoilState(availableUsers);
    const [count, increment] = useReducer((old) => ++old, 0);
    const [done, setDone] = useState(false);
    const [ready, setReady] = useState(false);

    const doLoad = useCallback(async (data: ZipData) => {
        if ('questions' in data) {
            const d = data.questions as { questions: QuestionData[]; forms: number[][] };
            setQuestions(d.questions);
            setForms(d.forms);
        }
    }, []);

    const doReady = useCallback((r: boolean) => {
        if (r) setReady(true);
    }, []);

    const selectedQuestions = useMemo(() => {
        return questions && forms && currentForm >= 0 ? filterQuestions(questions, forms[currentForm]) : [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions, forms, currentForm, count]);

    const doFormChange = useCallback((newForm: number) => {
        setCurrentForm(newForm);
        increment();
    }, []);

    return (
        <>
            <Loading loading={!ready || !questions || !forms}>
                {!username && (
                    <EnterUsername
                        onUsername={setUsername}
                        onChangeId={changeId}
                    />
                )}
                {username && forms && questions && (
                    <Form
                        onDone={setDone}
                        key={`form-${currentForm}`}
                        questions={selectedQuestions}
                    />
                )}
            </Loading>
            {ready && (
                <ContentLoader
                    content={[QUESTION_URL]}
                    onLoad={doLoad}
                />
            )}
            <StudentProtocol
                onAvailableUsers={setAvailable}
                done={done}
                userID={MYID}
                server={code}
                username={username}
                onReady={doReady}
                questions={questions}
                form={currentForm}
                onFormChange={doFormChange}
            />
        </>
    );
}

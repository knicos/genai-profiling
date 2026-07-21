import { useCallback, useMemo, useReducer, useState } from 'react';
import { Peer } from '@genai-fi/base/hooks/peer';
import { useParams } from 'react-router-dom';
import Loading from '@genaipg/components/Loading/Loading';
import EnterUsername from './EnterUsername';
import { QuestionData } from '@genaipg/components/Question/types';
import Form from '@genaipg/components/Form/Form';
import { useChangeableID } from '@genaipg/hooks/id';
import { useAtomValue, useSetAtom } from 'jotai';
import { availableUsers } from '@genaipg/state/sessionState';
import StudentProtocol from './StudentProtocol';
import { useRandom } from '@genai-fi/base';
import { formAtom } from '@genaipg/state/profileState';
import Gameview from './GameView/GameView';
import QuestionLoader from '@genaipg/components/ContentLoaders/QuestionLoader';

const USERNAME_KEY = 'genai_pg_username';

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
    const MYCODE = useRandom(10);
    const { code } = useParams();
    const [material, setMaterial] = useState<string>();
    const [lang, setLang] = useState<string>();
    const [username, setUsername] = useState<string | undefined>(loadUser);
    const [MYID, changeId] = useChangeableID(8);
    const [questions, setQuestions] = useState<QuestionData[]>();
    const [forms, setForms] = useState<number[][]>();
    const [currentForm, setCurrentForm] = useState(-1);
    const setAvailable = useSetAtom(availableUsers);
    const [, increment] = useReducer((old) => ++old, 0);
    const [done, setDone] = useState(false);
    const [ready, setReady] = useState(false);
    const form = useAtomValue(formAtom)

    const doReady = useCallback((r: boolean) => {
        if (r) setReady(true);
    }, []);

    const doConfig = useCallback((m: string, l: string) => {
        setMaterial(m);
        setLang(l);
    }, []);

    /*TODO: delete later*/
    const selectedQuestions = useMemo(() => {
        return questions && forms && currentForm >= 0 ? filterQuestions(questions, forms[currentForm]) : [];
    }, [questions, forms, currentForm]);

    const doFormChange = useCallback((newForm: number) => {
        setCurrentForm(newForm);
        increment();
    }, []);

    return (
        <>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`pg-${MYCODE}`}
                server={`pg-${code}`}
            >
                <Loading loading={!form?.questions}>
                    {!username && (
                        <EnterUsername
                            onUsername={setUsername}
                            onChangeId={changeId}
                        />
                    )}
                    {username && form?.forms && form?.questions && (
                        /*TODO: Delete later */
                        material && material === 'default' ? ( 
                            <Form
                                onDone = { setDone }
                                key = {`form-${currentForm}`}
                                questions={selectedQuestions}
                            />
                        ) : (
                            <Gameview onDone={setDone} formIndex={currentForm} />
                        )
                    )}
                </Loading>
                {ready && material && lang && !form && (
                    <QuestionLoader
                        lang={lang || 'fi'}
                        profile={material || 'default'}
                        onQuestions={setQuestions}
                        onForms={setForms}
                    />
                )}
                <StudentProtocol
                    onAvailableUsers={setAvailable}
                    done={done}
                    form={currentForm}
                    userID={MYID}
                    username={username}
                    onReady={doReady}
                    onFormChange={doFormChange}
                    onConfig={doConfig}
                />
            </Peer>
        </>
    );
}

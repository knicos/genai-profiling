import { QuestionData } from '@genaipg/components/Question/types';
import { usePeerData, usePeerSender, usePeerStatus } from '@genai-fi/base/hooks/peer';
import { ConnectionStatus } from '@genai-fi/base';
import { EventProtocol, UserEntry } from '@genaipg/protocol/protocol';
import { useQuestionLogger } from '@genaipg/services/questionLogger/hook';
import { updateAllResponses } from '@genaipg/services/questionLogger/logger';
import { useCallback, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { formAtom} from '@genaipg/state/profileState';

const USERNAME_KEY = 'genai_pg_username';

interface Props {
    done: boolean;
    username?: string;
    form: number;
    questions?: QuestionData[];
    onFormChange: (newForm: number) => void;
    onAvailableUsers: (users: Set<UserEntry>) => void;
    userID: string;
    onReady: (ready: boolean) => void;
    onConfig: (material: string, lang: string) => void;
}

export default function StudentProtocol({
    done,
    userID,
    username,
    form,
    questions,
    onFormChange,
    onAvailableUsers,
    onReady,
    onConfig,
}: Props) {
    const setForm = useSetAtom(formAtom);

    usePeerData(async (data: EventProtocol) => {
        if (data.event === 'pg:changeform') {
            onFormChange(data.form);
        } else if (data.event === 'pg:users') {
            onAvailableUsers(new Set(data.users));
        } else if (data.event === 'pg:responses') {
            updateAllResponses(data.responses);
        } else if (data.event === 'pg:config') {
            onConfig(data.material, data.lang);
        } else if (data.event === 'pg:profile') {
            try {
                setForm(
                    {
                        questions: data.data.questions,
                        forms: data.data.forms
                    }
                )
            } catch (err) {
                console.error('failed to load profile', err)
            }
        }
    });

    const send = usePeerSender<EventProtocol>();
    const ready = usePeerStatus();

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
                    userId: userID,
                    form: form,
                });
            }
        },
        [send, username, form, questions, userID]
    );
    useQuestionLogger(logFn);

    useEffect(() => {
        if (username && send && ready) {
            window.sessionStorage.setItem(USERNAME_KEY, username);
            send({ event: 'pg:reguser', username, id: userID });
        }
    }, [username, send, ready, userID]);

    useEffect(() => {
        onReady(ready === 'ready');
    }, [ready, onReady]);

    useEffect(() => {
        if (send) {
            send({ event: 'pg:done', done, id: userID });
        }
    }, [done, send, userID]);

    return (
        <ConnectionStatus
            api={import.meta.env.VITE_APP_APIURL}
            appName="classroom"
            checkURL={`${import.meta.env.VITE_APP_APIURL}/health`}
            visibility={3}
            noCheck={false}
        />
    );
}

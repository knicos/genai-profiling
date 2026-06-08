import { QuestionData } from '@genaipg/components/Question/types';
import usePeer from '@genai-fi/base/hooks/peer';
import { ConnectionStatus } from '@genai-fi/base';
import { EventProtocol, UserEntry } from '@genaipg/protocol/protocol';
import { useQuestionLogger } from '@genaipg/services/questionLogger/hook';
import { updateAllResponses } from '@genaipg/services/questionLogger/logger';
import { useCallback, useEffect } from 'react';
import useRandom from '@genai-fi/base/hooks/random';

const USERNAME_KEY = 'genai_pg_username';

interface Props {
    done: boolean;
    server?: string;
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
    server,
    username,
    form,
    questions,
    onFormChange,
    onAvailableUsers,
    onReady,
    onConfig,
}: Props) {
    const MYCODE = useRandom(10);

    const onData = useCallback(
        (data: EventProtocol) => {
            if (data.event === 'pg:changeform') {
                onFormChange(data.form);
            } else if (data.event === 'pg:users') {
                onAvailableUsers(new Set(data.users));
            } else if (data.event === 'pg:responses') {
                updateAllResponses(data.responses);
            } else if (data.event === 'pg:config') {
                onConfig(data.material, data.lang);
            }
        },
        [onAvailableUsers, onFormChange, onConfig]
    );

    const { ready, send } = usePeer<EventProtocol>({
        host: import.meta.env.VITE_APP_PEER_SERVER,
        secure: import.meta.env.VITE_APP_PEER_SECURE === '1',
        key: import.meta.env.VITE_APP_PEER_KEY || 'peerjs',
        port: import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443,
        code: server && `pg-${MYCODE}`,
        server: `pg-${server}`,
        onData,
    });

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
        onReady(ready);
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

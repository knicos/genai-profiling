import ConnectionMonitor from '@genaipg/components/ConnectionMonitor/ConnectionMonitor';
import { QuestionData } from '@genaipg/components/Question/types';
import usePeer from '@genaipg/hooks/peer';
import useRandom from '@genaipg/hooks/random';
import { EventProtocol, UserEntry } from '@genaipg/protocol/protocol';
import { useQuestionLogger } from '@genaipg/services/questionLogger/hook';
import { updateAllResponses } from '@genaipg/services/questionLogger/logger';
import { useCallback, useEffect } from 'react';

const USERNAME_KEY = 'genai_pg_username';

interface Props {
    done: boolean;
    server?: string;
    username?: string;
    form: number;
    questions?: QuestionData[];
    onFormChange: (newForm: number) => void;
    onAvailableUsers: (users: UserEntry[]) => void;
    userID: string;
    onReady: (ready: boolean) => void;
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
}: Props) {
    const MYCODE = useRandom(10);

    const onData = useCallback(
        (data: EventProtocol) => {
            if (data.event === 'pg:changeform') {
                onFormChange(data.form);
            } else if (data.event === 'pg:users') {
                onAvailableUsers(data.users);
            } else if (data.event === 'pg:responses') {
                updateAllResponses(data.responses);
            }
        },
        [onAvailableUsers, onFormChange]
    );

    const { ready, send, status, error } = usePeer<EventProtocol>({
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
        <ConnectionMonitor
            ready={ready}
            status={status}
            error={error}
        />
    );
}

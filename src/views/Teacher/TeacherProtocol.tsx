import { useCallback, useEffect, useState } from 'react';
import { UserInfo } from './userinfo';
import { EventProtocol, ResponseData, UserEntry } from '@genaipg/protocol/protocol';
import { DataConnection } from 'peerjs';
import { addUserName, getAllUsers, getUserName, getUserResponses } from './userState';
import usePeer from '@knicos/genai-base/hooks/peer';
import ConnectionMonitor from '@knicos/genai-base/components/ConnectionMonitor';

function getOfflineUsers(online: string[]): UserEntry[] {
    const allUsers = getAllUsers();
    const set = new Set<string>(online);
    const offline = allUsers.filter((u) => !set.has(u));
    const named = offline.map((u: string) => ({ id: u, name: getUserName(u) }));
    return named.filter((u) => u.name !== '');
}

interface Props {
    form?: number;
    code: string;
    material?: string;
    lang?: string;
    onDone: (done: boolean, id: string) => void;
    onUsers: (users: UserInfo[]) => void;
    onResponse: (id: string, data: ResponseData) => void;
    onReady: (ready: boolean) => void;
}

export default function TeacherProtocol({ form, code, onDone, onUsers, onResponse, onReady, material, lang }: Props) {
    const [users, setUsers] = useState<UserInfo[]>([]);

    const dataHandler = useCallback(
        (data: EventProtocol, conn: DataConnection) => {
            // console.log('GOT DATA', data);
            if (data.event === 'pg:reguser') {
                addUserName(data.id, data.username);
                setUsers((old) => [
                    ...old.filter((v) => v.id !== data.id),
                    { username: data.username, id: data.id, connection: conn },
                ]);

                const rep = getUserResponses(data.id);
                if (rep) {
                    conn.send({
                        event: 'pg:responses',
                        id: data.id,
                        responses: Array.from(rep).map((r) => ({
                            id: r[0],
                            value: r[1],
                        })),
                    });
                }

                if (form !== undefined) {
                    conn.send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
                }
            } else if (data.event === 'eter:join') {
                conn.send({ event: 'pg:users', users: getOfflineUsers(users.map((u) => u.id)) });
                if (material && lang) {
                    conn.send({ event: 'pg:config', material, lang });
                }
            } else if (data.event === 'pg:response') {
                onResponse(data.userId, data);
            } else if (data.event === 'pg:done') {
                onDone(data.done, data.id);
            }
        },
        [form, users, onDone, onResponse, material, lang]
    );
    const closeHandler = useCallback((conn?: DataConnection) => {
        if (conn) {
            setUsers((old) => old.filter((o) => o.connection !== conn));
        }
    }, []);

    const { ready, send, error, status } = usePeer({
        host: import.meta.env.VITE_APP_PEER_SERVER,
        secure: import.meta.env.VITE_APP_PEER_SECURE === '1',
        key: import.meta.env.VITE_APP_PEER_KEY || 'peerjs',
        port: import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443,
        code: `pg-${code}`,
        onData: dataHandler,
        onClose: closeHandler,
    });

    useEffect(() => {
        if (send) {
            send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
        }
    }, [form, send]);

    useEffect(() => {
        onUsers(users);
    }, [users, onUsers]);

    useEffect(() => {
        onReady(ready);
    }, [onReady, ready]);

    return (
        <ConnectionMonitor
            api={import.meta.env.VITE_APP_APIURL}
            appName="classroom"
            ready={ready}
            error={error}
            status={status}
        />
    );
}

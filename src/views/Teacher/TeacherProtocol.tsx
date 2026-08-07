import { useEffect, useState } from 'react';
import { UserInfo } from './userinfo';
import { EventProtocol, ResponseData, UserEntry } from '@genaipg/protocol/protocol';
import { Connection } from '@genai-fi/base';
import { addUserIntermission, addUserName, getAllUsers, getUserName, getUserResponses } from './userState';
import { usePeerClose, usePeerData, usePeerSender, usePeerStatus } from '@genai-fi/base/hooks/peer';
import { ConnectionStatus } from '@genai-fi/base';
import { useAtomValue } from 'jotai';
import { profileAtom } from '@genaipg/state/profileState';
import { ProfileMeta } from '@genaipg/components/ContentLoaders/types';
import { UserTimelineData } from '@genaipg/components/Slide/Ending/types';

const LOCAL_PROFILE_KEY = 'custom';

function getOfflineUsers(online: string[]): UserEntry[] {
    const allUsers = getAllUsers();
    const set = new Set<string>(online);
    const offline = allUsers.filter((u) => !set.has(u));
    const named = offline.map((u: string) => ({ id: u, name: getUserName(u) }));
    return named.filter((u) => u.name !== '');
}

interface Props {
    form?: number;
    material?: string;
    lang?: string;
    onDone: (done: boolean, id: string) => void;
    onUsers: (users: UserInfo[]) => void;
    onResponse: (id: string, data: ResponseData) => void;
    onReady: (ready: boolean) => void;
    timelineData?: UserTimelineData[];
}

export default function TeacherProtocol({ form, onDone, onUsers, onResponse, onReady, material, lang, timelineData }: Props) {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const localProfile = useAtomValue(profileAtom);

    usePeerData((data: EventProtocol, conn: Connection<EventProtocol>) => {
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
                    userId: data.id,
                    responses: Array.from(rep.entries()).map(([categoryId, questions]) => ({
                        id: categoryId,
                        questions: Array.from(questions.entries()).map(([questionId, value]) => ({
                            id: questionId,
                            value,
                        })),
                    })),
                });
            }

            if (form !== undefined) {
                conn.send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
            }
        } else if (data.event === 'eter:join') {
            conn.send({ event: 'pg:users', users: getOfflineUsers(users.map((u) => u.id)) });
            if (material && lang) {
                if (material === LOCAL_PROFILE_KEY && localProfile) {
                    const data: ProfileMeta = {
                        categories: localProfile.categories,
                        slides: localProfile.slides,
                        forms: localProfile.forms
                    }

                    conn.send({
                        event: 'pg:profile',
                        data: data
                    })
                }
                conn.send({ event: 'pg:config', material, lang });
            }
        } else if (data.event === 'pg:response') {
            onResponse(data.userId, data);
        } else if (data.event === 'pg:done') {
            onDone(data.done, data.id);
        } else if (data.event == 'pg:intermission') {
            addUserIntermission(data.userId, data.form, data.value);
        }
    });

    usePeerClose((conn?: Connection<EventProtocol>) => {
        if (conn) {
            setUsers((old) => old.filter((o) => o.connection !== conn));
        }
    });

    const send = usePeerSender<EventProtocol>();
    const ready = usePeerStatus();

    useEffect(() => {
        if (send) {
            send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
        }
    }, [form, send]);

    useEffect(() => {
        if (timelineData) {
            send({ 
                event: 'pg:timeline', 
                data: timelineData 
        });
        }
    }, [timelineData, send]);

    useEffect(() => {
        onUsers(users);
    }, [users, onUsers]);

    useEffect(() => {
        onReady(ready === 'ready');
    }, [onReady, ready]);

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

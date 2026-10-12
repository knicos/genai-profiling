import { usePeerData, usePeerSender, usePeerStatus } from '@genai-fi/base/hooks/peer';
import { ConnectionStatus } from '@genai-fi/base';
import { ResponseEntry, CategoryEntry } from '@genaipg/protocol/protocol';
import { EventProtocol, UserEntry } from '@genaipg/protocol/protocol';
import { updateAllResponses } from '@genaipg/services/questionLogger/logger';
import { useCallback, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { profileAtom } from '@genaipg/state/profileState';
import { intermissionAtom } from '@genaipg/state/intermissionState';
import { updateAllResponseAtom } from '@genaipg/state/responseState';
import { useResponseLogger } from '@genaipg/services/responseLogger/hook';
import { timelineAtom, timelinePlayingAtom } from '@genaipg/state/timelineState';

const USERNAME_KEY = 'genai_pg_username';

interface Props {
    done: boolean;
    username?: string;
    form: number;
    onFormChange: (newForm: number) => void;
    onAvailableUsers: (users: Set<UserEntry>) => void;
    userID: string;
    onReady: (ready: boolean) => void;
    onConfig: (material: string, lang: string) => void;
}

export default function StudentProtocol({
    done,
    userID,
    form,
    username,
    onFormChange,
    onAvailableUsers,
    onReady,
    onConfig,
}: Props) {
    const updateAll = useSetAtom(updateAllResponseAtom);
    const setTimelineData = useSetAtom(timelineAtom);
    const setStartTimeline = useSetAtom(timelinePlayingAtom);
    const setProfile = useSetAtom(profileAtom);
    const intermissions = useAtomValue(intermissionAtom);


    function isCategoryEntries(responses: ResponseEntry[] | CategoryEntry[]): responses is CategoryEntry[] {
        return (responses[0] as CategoryEntry)?.questions !== undefined;
    }
    usePeerData(async (data: EventProtocol) => {
        if (data.event === 'pg:changeform') {
            onFormChange(data.form);
        } else if (data.event === 'pg:users') {
            onAvailableUsers(new Set(data.users));
        } else if (data.event === 'pg:responses') {
            if (isCategoryEntries(data.responses))
                updateAll({ categories: data.responses })
            else
                updateAllResponses(data.responses);
        } else if (data.event === 'pg:config') {
            onConfig(data.material, data.lang);
        } else if (data.event === 'pg:profile') {
            try {
                setProfile({
                    categories: data.data.categories,
                    forms: data.data.forms,
                    slides: data.data.slides
                });
            } catch (err) {
                console.error('failed to load profile', err)
            }
        } else if (data.event === 'pg:timeline') {
            setTimelineData(data.data.filter(t => t.userId === userID));
            setStartTimeline(true);
        }
    });

    const send = usePeerSender<EventProtocol>();
    const ready = usePeerStatus();

    const logResponses = useCallback(
        (categoryId: string, questionId: string, value: string | string[]) => {
            if (send && username) {
                send({
                    event: 'pg:response',
                    category: categoryId,
                    question: questionId,
                    value,
                    timestamp: Date.now(),
                    date: new Date().toISOString(),
                    username,
                    userId: userID,
                    form: form
                })
            }
        },
        [send, username, userID, form]
    )

    useResponseLogger(logResponses);

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
        if (intermissions[form] && send && username) {
            send({
                event: 'pg:intermission',
                value: intermissions[form],
                timestamp: Date.now(),
                date: new Date().toISOString(),
                username,
                userId: userID,
                form,
            });
        }
    }, [intermissions, form, send, username, userID])

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
            visibility={0}
            noCheck={false}
        />
    );
}

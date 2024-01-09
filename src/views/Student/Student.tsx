import useRandom from '@genaipg/hooks/random';
import { EventProtocol } from '@genaipg/protocol/protocol';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { DataConnection } from 'peerjs';
import usePeer from '@genaipg/hooks/peer';
import Loading from '@genaipg/components/Loading/Loading';
import EnterUsername from './EnterUsername';

const USERNAME_KEY = 'genai_pg_username';

function loadUser() {
    const name = window.sessionStorage.getItem(USERNAME_KEY);
    return name || undefined;
}

export function Component() {
    const { code } = useParams();
    const [username, setUsername] = useState<string | undefined>(loadUser);
    const MYCODE = useRandom(10);

    const onData = useCallback((data: EventProtocol) => {
        console.log('GOT DATA', data);
    }, []);

    const { ready, send } = usePeer<EventProtocol>({ code: code && `pg-${MYCODE}`, server: `pg-${code}`, onData });

    useEffect(() => {
        if (username && send && ready) {
            window.sessionStorage.setItem(USERNAME_KEY, username);
            send({ event: 'eter:reguser', username });
        }
    }, [username, send, ready]);

    return (
        <Loading loading={!ready}>
            {!username && <EnterUsername onUsername={setUsername} />}
            {username && <div>Hello</div>}
        </Loading>
    );
}

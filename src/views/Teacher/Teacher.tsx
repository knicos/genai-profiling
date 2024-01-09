import { useParams } from 'react-router-dom';
import SlideShow from '@genaipg/components/SlideShow/SlideShow';
import { useCallback, useState } from 'react';
import usePeer from '@genaipg/hooks/peer';
import { useID } from '@genaipg/hooks/id';
import { UserInfo } from './userinfo';
import { DataConnection } from 'peerjs';
import { EventProtocol } from '@genaipg/protocol/protocol';
import Loading from '@genaipg/components/Loading/Loading';
import StartDialog from './StartDialog';

export function Component() {
    const { page } = useParams();
    const MYCODE = useID(5);
    const [users, setUsers] = useState<UserInfo[]>([]);

    const dataHandler = useCallback((data: EventProtocol, conn: DataConnection) => {
        console.log('GOT DATA', data);
        if (data.event === 'eter:reguser') {
            setUsers((old) => [...old, { username: data.username, connection: conn }]);
        }
    }, []);
    const closeHandler = useCallback((conn?: DataConnection) => {
        if (conn) {
            setUsers((old) => old.filter((o) => o.connection !== conn));
        }
    }, []);

    const { ready } = usePeer({ code: `pg-${MYCODE}`, onData: dataHandler, onClose: closeHandler });

    return (
        <Loading loading={!ready}>
            (
            {page === undefined && (
                <StartDialog
                    users={users}
                    code={MYCODE}
                    onStart={() => {}}
                />
            )}
            {page && (
                <SlideShow
                    index={parseInt(page || '0')}
                    slides={[]}
                />
            )}
            )
        </Loading>
    );
}

import { useNavigate, useParams } from 'react-router-dom';
import SlideShow from '@genaipg/components/SlideShow/SlideShow';
import { useCallback, useEffect, useState } from 'react';
import usePeer from '@genaipg/hooks/peer';
import { useID } from '@genaipg/hooks/id';
import { UserInfo } from './userinfo';
import { DataConnection } from 'peerjs';
import { EventProtocol } from '@genaipg/protocol/protocol';
import Loading from '@genaipg/components/Loading/Loading';
import StartDialog from './StartDialog';
import style from './style.module.css';
import { SlideMeta } from '@genaipg/components/Slide/types';

const SLIDE_URL = '/data/slides.json';

export function Component() {
    const { page } = useParams();
    const MYCODE = useID(5);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const navigate = useNavigate();
    const [slides, setSlides] = useState<SlideMeta[]>();

    useEffect(() => {
        fetch(SLIDE_URL).then((response) => {
            response.json().then((j) => setSlides(j));
        });
    }, []);

    const npage = page ? parseInt(page) : -1;

    const dataHandler = useCallback(
        (data: EventProtocol, conn: DataConnection) => {
            console.log('GOT DATA', data);
            if (data.event === 'pg:reguser') {
                setUsers((old) => [...old, { username: data.username, connection: conn }]);
                if (slides) {
                    const form = slides[npage]?.form;
                    conn.send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
                }
            }
        },
        [slides, npage]
    );
    const closeHandler = useCallback((conn?: DataConnection) => {
        if (conn) {
            setUsers((old) => old.filter((o) => o.connection !== conn));
        }
    }, []);

    const { ready, send } = usePeer({ code: `pg-${MYCODE}`, onData: dataHandler, onClose: closeHandler });

    useEffect(() => {
        if (slides && send) {
            const form = slides[npage]?.form;
            send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
        }
    }, [npage, send, slides]);

    return (
        <Loading loading={!ready || !slides}>
            <div className={style.page}>
                {page === undefined && (
                    <StartDialog
                        users={users}
                        code={MYCODE}
                        onStart={() => navigate(`/classroom/${npage + 1}`)}
                    />
                )}
                {page && (
                    <SlideShow
                        index={npage}
                        slides={slides || []}
                        showControls
                        hasNext={npage < (slides?.length || 0) - 1}
                        onChange={(index: number) => navigate(index >= 0 ? `/classroom/${index}` : '/classroom')}
                    />
                )}
            </div>
        </Loading>
    );
}

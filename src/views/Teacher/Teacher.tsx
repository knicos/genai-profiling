import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SlideShow from '@genaipg/components/SlideShow/SlideShow';
import { useCallback, useEffect, useState } from 'react';
import usePeer from '@genaipg/hooks/peer';
import { useID } from '@genaipg/hooks/id';
import { UserInfo } from './userinfo';
import { DataConnection } from 'peerjs';
import { EventProtocol, UserEntry } from '@genaipg/protocol/protocol';
import Loading from '@genaipg/components/Loading/Loading';
import StartDialog from './StartDialog';
import style from './style.module.css';
import { SlideMeta } from '@genaipg/components/Slide/types';
import {
    addTeacherLog,
    addUserName,
    addUserResponse,
    getAllUsers,
    getUserName,
    getUserResponses,
    usePersistentData,
} from './userState';
import SlideContainer from '@genaipg/components/Slide/SlideContainer';
import { SmallButton } from '@genaipg/components/Button/Button';
import { saveFile } from '@genaipg/services/exporter/zipExport';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@mui/icons-material/Download';
import { Dialog } from '@mui/material';

const SLIDE_URL = '/data/slides.json';

function getOfflineUsers(online: string[]): UserEntry[] {
    const allUsers = getAllUsers();
    const set = new Set<string>(online);
    const offline = allUsers.filter((u) => !set.has(u));
    const named = offline.map((u: string) => ({ id: u, name: getUserName(u) }));
    return named.filter((u) => u.name !== '');
}

export function Component() {
    const { t } = useTranslation();
    const { page, material } = useParams();
    const MYCODE = useID(5);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const navigate = useNavigate();
    const [slides, setSlides] = useState<SlideMeta[]>();
    const [params] = useSearchParams();
    const [showQR, setShowQR] = useState(false);
    const saver = usePersistentData(MYCODE);
    const [done, setDone] = useState(new Set<string>());

    useEffect(() => {
        fetch(SLIDE_URL).then((response) => {
            response.json().then((j) => setSlides(j));
        });
    }, []);

    const npage = page ? parseInt(page) : -1;

    const dataHandler = useCallback(
        (data: EventProtocol, conn: DataConnection) => {
            // console.log('GOT DATA', data);
            if (data.event === 'pg:reguser') {
                addUserName(data.id, data.username);
                setUsers((old) => [...old, { username: data.username, id: data.id, connection: conn }]);

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

                if (slides) {
                    const form = slides[npage]?.form;
                    conn.send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
                }
            } else if (data.event === 'eter:join') {
                conn.send({ event: 'pg:users', users: getOfflineUsers(users.map((u) => u.id)) });
            } else if (data.event === 'pg:response') {
                addUserResponse(params.get('name') || 'NoName', data.userId, data, slides?.[npage]);
            } else if (data.event === 'pg:done') {
                setDone((old) => {
                    const newSet = new Set<string>(old);
                    if (data.done) {
                        newSet.add(data.id);
                    } else {
                        newSet.delete(data.id);
                    }
                    return newSet;
                });
            }
        },
        [slides, npage, params, users]
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
            addTeacherLog(params.get('name') || 'NoName', form === undefined ? -1 : form, slides?.[npage]);
            send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
            saver();
        }
    }, [npage, send, slides, params, saver]);

    return (
        <Loading loading={!ready || !slides}>
            <div className={style.page}>
                <SlideShow
                    doneCount={users.length - done.size}
                    index={npage}
                    slides={slides || []}
                    showControls
                    hasNext={npage < (slides?.length || 0)}
                    onDownload={() => saveFile()}
                    onQRCode={() => setShowQR(true)}
                    onChange={(index: number) =>
                        navigate({
                            pathname: index >= 0 ? `/classroom/${material}/${index}` : `/classroom/${material}`,
                            search: params.toString(),
                        })
                    }
                    defaultSlide={
                        page === undefined ? (
                            <SlideContainer>
                                <StartDialog
                                    users={users}
                                    code={MYCODE}
                                />
                            </SlideContainer>
                        ) : npage >= (slides?.length || -1) ? (
                            <SlideContainer>
                                <SmallButton
                                    variant="contained"
                                    onClick={() => {
                                        saveFile();
                                    }}
                                    startIcon={<DownloadIcon />}
                                >
                                    {t('Download')}
                                </SmallButton>
                            </SlideContainer>
                        ) : undefined
                    }
                />
                {showQR && (
                    <Dialog
                        maxWidth="md"
                        open={showQR}
                        onClose={() => setShowQR(false)}
                    >
                        <StartDialog
                            users={users}
                            code={MYCODE}
                        />
                    </Dialog>
                )}
                <div className={style.logo}>
                    <img
                        src="/logo64_bw.png"
                        alt="GenAI Logo"
                        width={64}
                        height={64}
                    />
                </div>
            </div>
        </Loading>
    );
}

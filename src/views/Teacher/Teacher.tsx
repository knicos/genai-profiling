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
import { addTeacherLog, addUserName, addUserResponse } from './userState';
import SlideContainer from '@genaipg/components/Slide/SlideContainer';
import { SmallButton } from '@genaipg/components/Button/Button';
import { saveFile } from '@genaipg/services/exporter/zipExport';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@mui/icons-material/Download';

const SLIDE_URL = '/data/slides.json';

export function Component() {
    const { t } = useTranslation();
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
                addUserName(data.id, data.username);
                setUsers((old) => [...old, { username: data.username, connection: conn }]);
                if (slides) {
                    const form = slides[npage]?.form;
                    conn.send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
                }
            } else if (data.event === 'pg:response') {
                addUserResponse(data.userId, data, slides?.[npage]);
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
            addTeacherLog(form === undefined ? -1 : form, slides?.[npage]);
            send({ event: 'pg:changeform', form: form === undefined ? -1 : form });
        }
    }, [npage, send, slides]);

    return (
        <Loading loading={!ready || !slides}>
            <div className={style.page}>
                <SlideShow
                    index={npage}
                    slides={slides || []}
                    showControls
                    hasNext={npage < (slides?.length || 0)}
                    onChange={(index: number) => navigate(index >= 0 ? `/classroom/${index}` : '/classroom')}
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

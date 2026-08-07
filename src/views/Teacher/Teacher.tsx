import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SlideShow from '@genaipg/components/SlideShow/SlideShow';
import { useCallback, useEffect, useState } from 'react';
import { useID } from '@genaipg/hooks/id';
import { UserInfo } from './userinfo';
import { ResponseData } from '@genaipg/protocol/protocol';
import Loading from '@genaipg/components/Loading/Loading';
import StartDialog from './StartDialog';
import style from './style.module.css';
import { addTeacherLog, addUserResponse, usePersistentData } from './userState';
import SlideContainer from '@genaipg/components/Slide/SlideContainer';
import { LargeButton } from '@genai-fi/base/components/Button';
import { saveFile } from '@genaipg/services/exporter/zipExport';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@mui/icons-material/Download';
import { Dialog } from '@mui/material';
import TeacherProtocol from './TeacherProtocol';
import ProfileLoader from '@genaipg/components/ContentLoaders/ProfileLoader';
import { Privacy } from '@genai-fi/base';
import gitInfo from '../../generatedGitInfo.json';
import { Peer } from '@genai-fi/base/hooks/peer';
import { useAtomValue } from 'jotai';
import { profileAtom } from '@genaipg/state/profileState';
import { UserTimelineData } from '@genaipg/components/Slide/Ending/types';

export function Component() {
    const { t } = useTranslation();
    const { page, material, lang } = useParams();
    const MYCODE = useID(5);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [showQR, setShowQR] = useState(false);
    const saver = usePersistentData(MYCODE);
    const [done, setDone] = useState(new Set<string>());
    const [ready, setReady] = useState(false);
    const [timelineData, setTimelineData] = useState<UserTimelineData[] | undefined>(undefined);
    const profile = useAtomValue(profileAtom);

    const npage = page ? parseInt(page) : -1;
    const [currentForm, setCurrentForm] = useState<number>(-1);

    useEffect(() => {
        if (profile?.slides) {
            const form = profile.slides[npage]?.form;
            addTeacherLog(params.get('name') || 'NoName', form === undefined ? -1 : form, profile.slides?.[npage]);
            saver();
        }
    }, [npage, profile, params, saver]);

    useEffect(() => {
        const slide = profile?.slides?.[npage];
        if (slide?.form !== undefined) {
            setCurrentForm(slide.form);
        }
    }, [npage, profile]);

    const updateTimelineData = useCallback((data: UserTimelineData[]) => {
        setTimelineData(data);
    }, []);

    const doDone = useCallback((d: boolean, id: string) => {
        setDone((old) => {
            const newSet = new Set<string>(old);
            if (d) {
                newSet.add(id);
            } else {
                newSet.delete(id);
            }
            return newSet;
        });
    }, []);

    const doResponse = useCallback((id: string, data: ResponseData) => {
        addUserResponse(params.get('name') || 'NoName', id, data, profile?.slides[npage]);
    }, [params, profile, npage]);

    return (
        <>
            <Peer
                host={import.meta.env.VITE_APP_PEER_SERVER}
                secure={import.meta.env.VITE_APP_PEER_SECURE === '1'}
                peerkey={import.meta.env.VITE_APP_PEER_KEY || 'peerjs'}
                port={import.meta.env.VITE_APP_PEER_PORT ? parseInt(import.meta.env.VITE_APP_PEER_PORT) : 443}
                code={`pg-${MYCODE}`}
            >
                <Loading loading={!ready || !profile?.slides}>
                    <div className={style.page}>
                        <SlideShow
                            doneCount={users.length - done.size}
                            index={npage}
                            slides={profile?.slides || []}
                            showControls
                            hasNext={npage < (profile?.slides.length || 0)}
                            onDownload={() => saveFile()}
                            onQRCode={() => setShowQR(true)}
                            changeForm={(formIndex: number) => setCurrentForm(formIndex)}
                            setTimelineData={updateTimelineData}
                            onChange={(index: number) =>
                                navigate({
                                    pathname:
                                        index >= 0
                                            ? `/game/classroom/${material}/${lang}/${index}`
                                            : `/game/classroom/${material}/${lang}`,
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
                                ) : npage >= (profile?.slides?.length || -1) ? (
                                    <SlideContainer>
                                        <LargeButton
                                            variant="contained"
                                            onClick={() => {
                                                saveFile();
                                            }}
                                            startIcon={<DownloadIcon />}
                                        >
                                            {t('Download')}
                                        </LargeButton>
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
                        <Privacy
                            appName="profiling"
                            tag={gitInfo.gitTag || 'notag'}
                        />
                    </div>
                </Loading>
                {ready && (
                    <ProfileLoader
                        lang={lang || 'fi'}
                        profile={material || 'default'}
                    />
                )}
                <TeacherProtocol
                    onReady={setReady}
                    onUsers={setUsers}
                    onDone={doDone}
                    form={npage >= 0 ? currentForm : undefined}
                    onResponse={doResponse}
                    material={material}
                    lang={lang}
                    timelineData={timelineData}
                />
            </Peer>
        </>
    );
}

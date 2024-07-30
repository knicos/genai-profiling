import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SlideShow from '@genaipg/components/SlideShow/SlideShow';
import { useCallback, useEffect, useState } from 'react';
import { useID } from '@genaipg/hooks/id';
import { UserInfo } from './userinfo';
import { ResponseData } from '@genaipg/protocol/protocol';
import Loading from '@genaipg/components/Loading/Loading';
import StartDialog from './StartDialog';
import style from './style.module.css';
import { SlideMeta } from '@genaipg/components/Slide/types';
import { addTeacherLog, addUserResponse, usePersistentData } from './userState';
import SlideContainer from '@genaipg/components/Slide/SlideContainer';
import { LargeButton } from '@knicos/genai-base/components/Button';
import { saveFile } from '@genaipg/services/exporter/zipExport';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@mui/icons-material/Download';
import { Dialog } from '@mui/material';
import TeacherProtocol from './TeacherProtocol';
import ProfileLoader from '@genaipg/components/ProfileLoader/ProfileLoader';
import { Privacy } from '@knicos/genai-base';
import gitInfo from '../../generatedGitInfo.json';

export function Component() {
    const { t } = useTranslation();
    const { page, material, lang } = useParams();
    const MYCODE = useID(5);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const navigate = useNavigate();
    const [slides, setSlides] = useState<SlideMeta[]>();
    const [params] = useSearchParams();
    const [showQR, setShowQR] = useState(false);
    const saver = usePersistentData(MYCODE);
    const [done, setDone] = useState(new Set<string>());
    const [ready, setReady] = useState(false);

    const npage = page ? parseInt(page) : -1;

    useEffect(() => {
        if (slides) {
            const form = slides[npage]?.form;
            addTeacherLog(params.get('name') || 'NoName', form === undefined ? -1 : form, slides?.[npage]);
            saver();
        }
    }, [npage, slides, params, saver]);

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

    const doResponse = useCallback(
        (id: string, data: ResponseData) => {
            addUserResponse(params.get('name') || 'NoName', id, data, slides?.[npage]);
        },
        [params, slides, npage]
    );

    return (
        <>
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
                                pathname:
                                    index >= 0
                                        ? `/classroom/${material}/${lang}/${index}`
                                        : `/classroom/${material}/${lang}`,
                                search: params.toString(),
                            })
                        }
                        defaultSlide={
                            page === undefined ? (
                                <SlideContainer>
                                    <StartDialog
                                        material={material || 'default'}
                                        lang={lang || 'fi'}
                                        users={users}
                                        code={MYCODE}
                                    />
                                </SlideContainer>
                            ) : npage >= (slides?.length || -1) ? (
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
                                material={material || 'default'}
                                lang={lang || 'fi'}
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
                    onSlides={setSlides}
                />
            )}
            <TeacherProtocol
                code={MYCODE}
                onReady={setReady}
                onUsers={setUsers}
                onDone={doDone}
                form={slides?.[npage]?.form}
                onResponse={doResponse}
            />
        </>
    );
}

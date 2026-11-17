import { IconButton, Tooltip } from '@mui/material';
import Slide from '../Slide/Slide';
import { SlideMeta } from '../Slide/types';
import style from './style.module.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import { ReactElement, useState } from 'react';
import { UserTimelineData } from '../Slide/Ending/types';
import { useAtomValue } from 'jotai';
import { featureFlagsAtom } from '@genaipg/state/featureState';
import { Button, ReportDialog } from '@genai-fi/base';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { useTranslation } from 'react-i18next';

interface Props {
    index: number;
    slides: SlideMeta[];
    showControls?: boolean;
    hasNext?: boolean;
    onChange?: (index: number) => void;
    defaultSlide?: ReactElement;
    onDownload?: () => void;
    onQRCode?: () => void;
    doneCount?: number;
    userCount?: number;
    changeForm?: (formIndex: number) => void;
    setTimelineData?: (data: UserTimelineData[]) => void;
}

export default function SlideShow({
    index,
    slides,
    showControls,
    doneCount,
    userCount,
    onChange,
    hasNext,
    defaultSlide,
    onDownload,
    onQRCode,
    changeForm,
    setTimelineData,
}: Props) {
    const { t } = useTranslation();
    const { allowReportProblem } = useAtomValue(featureFlagsAtom);
    const [showReportDialog, setShowReportDialog] = useState(false);
    const expanded = index === -1 || index === slides.length - 1;


    return (
        <div className={style.container}>
            {index >= 0 && index < slides.length ? (
                <Slide
                    index={index}
                    slides={slides}
                    meta={slides[index]}
                    doneCount={doneCount}
                    userCount={userCount}
                    changeForm={changeForm}
                    setTimelineData={setTimelineData}
                />

            ) : (
                defaultSlide || null
            )}
            {showControls && (
                <div>
                    <div className={style.controls}>
                        <IconButton
                            size="large"
                            color="inherit"
                            disabled={index === -1}
                            onClick={() => {
                                if (onChange) onChange(index - 1);
                            }}
                        >
                            <NavigateBeforeIcon fontSize="large" />
                        </IconButton>
                        <div className={style.centralButtons}>
                            {onQRCode && (
                                <IconButton
                                    color="inherit"
                                    onClick={onQRCode}
                                >
                                    <QrCode2Icon fontSize="large" />
                                </IconButton>
                            )}
                            {onDownload && (
                                <IconButton
                                    color="inherit"
                                    onClick={onDownload}
                                >
                                    <DownloadIcon fontSize="large" />
                                </IconButton>
                            )}
                        </div>
                        <IconButton
                            size="large"
                            color="inherit"
                            disabled={!hasNext}
                            onClick={() => {
                                if (onChange) onChange(index + 1);
                            }}
                        >
                            <NavigateNextIcon fontSize="large" />
                        </IconButton>
                    </div>
                    {allowReportProblem && (
                        <Tooltip
                            title={t('app.reportProblemTip')}
                            arrow
                            className={style.reportButton}
                        >
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => setShowReportDialog(true)}
                                startIcon={<ReportOutlinedIcon fontSize="small" />}
                                sx={{
                                    padding: expanded ? '6px 16px' : '6px',
                                    '& .MuiButton-startIcon': {
                                        margin: expanded ? '0 8px 0 -4px' : 0,
                                        transition: 'margin 300ms ease',
                                    },
                                }}
                            >
                                <span
                                    className={style.reportButtonLabel}
                                    style={{
                                        gridTemplateColumns: expanded ? '1fr' : '0fr',
                                        opacity: expanded ? 1 : 0,
                                    }}
                                >
                                    <span>
                                        {t('app.reportProblem')}
                                    </span>
                                </span>
                            </Button>
                        </Tooltip>
                    )}

                    {allowReportProblem && showReportDialog && (
                        <ReportDialog
                            application="classroom"
                            apiURL={import.meta.env.VITE_APP_API}
                            open={showReportDialog}
                            onClose={() => setShowReportDialog(false)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

import { SlideBoard } from './types';
import { getQuestionData, getUserData } from '@genaipg/views/Teacher/userState';
import Board from '../Board/Board';
import { IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import style from './style.module.css';
import { useMemo, useState } from 'react';
import { profileAtom } from '@genaipg/state/profileState';
import { useAtomValue } from 'jotai';
import { QuestionData } from '../Question/types';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


interface Props {
    meta: SlideBoard;
}

export default function BoardSlide({ meta }: Props) {
    const { t } = useTranslation();
    const [zoom, setZoom] = useState(1);
    const [step, setStep] = useState(0);
    const profile = useAtomValue(profileAtom);
    const questions: QuestionData[] | undefined = profile?.categories
        .flatMap((category) =>
            meta.steps
                .filter((step) => step.categoryId === category.id)
                .map((step) =>
                    getQuestionData(
                        step.categoryId,
                        step.questionId,
                        profile.categories
                    )
                )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const userData = useMemo(() => getUserData(), [meta]);

    return (
        <>
            {questions &&
                <Board
                    questions={questions[step]}
                    categoryId={meta.steps[step].categoryId}
                    data={userData}
                    zoom={zoom}
                />
            }
            <div className={style.zoomControls}>
                <IconButton onClick={() => setZoom((old) => old * 1.1)}>
                    <ZoomInIcon />
                </IconButton>
                <IconButton onClick={() => setZoom((old) => old * 0.9)}>
                    <ZoomOutIcon />
                </IconButton>
            </div>
            <div className={style.buttonGroup}>
                <Button
                    variant="outlined"
                    className={style.revealButton}
                    onClick={() => setStep((old) => old - 1)}
                    disabled={step === 0}
                    startIcon={<ArrowBackIosNewIcon fontSize="inherit" />}
                >
                    {t("create.buttons.previous")}
                </Button>
                <Button
                    variant='outlined'
                    className={style.revealButton}
                    endIcon={<ArrowForwardIosIcon />}
                    disabled={step === meta.steps.length - 1}
                    onClick={() => setStep((old) => old + 1)}
                >
                    {t("create.buttons.next")}
                </Button>
            </div>
        </>
    );
}

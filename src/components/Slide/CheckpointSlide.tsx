import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAtomValue } from 'jotai';
import { profileAtom } from '@genaipg/state/profileState';
import { Category } from '../Question/types';
import style from './style.module.css';
import { useTranslation } from "react-i18next";
import { Button } from "@genai-fi/base";
import SegmentedBar from "../Charts/SegmentedBar";
import BasicBar from "../Charts/BasicBar";
import CheckpointText from "./CheckpointText";
import ShieldIcon from '@mui/icons-material/Shield';
import ChecklistIcon from '@mui/icons-material/Checklist';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getIntermissionAverage, getIntermissionCorrect } from "@genaipg/views/Teacher/userState";

interface Props {
    form: number;
    done: boolean;
}

export function CheckpointSlide({ form, done }: Props) {
    const { t } = useTranslation();
    const profile = useAtomValue(profileAtom);
    // Change
    const confidence = getIntermissionAverage(form);
    const correctness = getIntermissionCorrect(profile?.questions.questions as Category[]);

    const [displayCorrectness, setDisplayCorrectness] = useState<boolean>(false)
    const [displayValue, setDisplayValue] = useState(0);
    const [correctValue, setCorrectValue] = useState<number>(0);

    // useEffect animates the numeric values. 
    useEffect(() => {
        if (!displayCorrectness || correctness.correct === 0) {
            setCorrectValue(0);
            return;
        }

        let current = 0;

        const interval = setInterval(() => {
            current++;

            setCorrectValue(current);

            if (current >= correctness.correct) {
                clearInterval(interval);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [displayCorrectness, correctness.correct])

    useEffect(() => {
        let frame: number;

        const from = displayValue;
        const to = confidence;

        const duration = 600;
        const start = performance.now();

        function animate(now: number) {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);

            const next = Math.round(from + (to - from) * ease);
            setDisplayValue(next);

            if (p < 1) {
                frame = requestAnimationFrame(animate);
            }
        }

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [confidence, displayValue]);

    const triggerReveal = () => {
        setDisplayCorrectness(!displayCorrectness);
        setCorrectValue(0);
    }

    const getCorrectnessText = () => {
        if (!correctness.total && !displayCorrectness) return t("game.checkpoint.correctness.low");

        const percent = (correctValue / correctness.total) * 100;

        if (percent < 50) return t("game.checkpoint.correctness.low");
        if (percent < 80) return t("game.checkpoint.correctness.medium");
        return t("game.checkpoint.correctness.high");
    };

    const getConfidenceText = () => {
        if (!displayValue) return t("game.checkpoint.confidence.vote");

        if (displayValue < 50) return t("game.checkpoint.confidence.low");
        if (displayValue < 80) return t("game.checkpoint.confidence.medium");
        return t("game.checkpoint.confidence.high");
    };

    return (
        <Box className={style.checkpoint}>
            <Box className={style.checpointInnerContainer}>
                <div className={style.chartContainer}>
                    <div
                        className={style.chartInnerContainer}
                        style={{
                            justifyContent: 'flex-end',
                            transform: !displayCorrectness ? 'scale(1.085)' : 'scale(1)',
                        }}
                    >
                        <span className={`${style.checkpointIcon} ${style.confidence}`}>
                            <ShieldIcon fontSize="inherit" />
                        </span>
                        <CheckpointText
                            label={t("game.checkpoint.asClass")}
                            color="var(--purple)"
                        >
                            <div className={style.innerParagraph}>
                                <h1>
                                    {t("game.checkpoint.confidence.title")}
                                </h1>
                                <div className={style.score} style={{ color: 'var(--purple)' }}>
                                    <p>
                                        {displayValue}
                                        <span className={style.subDisplay}>
                                            %
                                        </span>
                                    </p>
                                </div>
                                <p>
                                    {getConfidenceText()}
                                </p>
                            </div>
                        </CheckpointText>
                        <BasicBar value={displayValue} />
                    </div>
                </div>
                {correctness && (
                    <div className={style.chartContainer} style={{ justifyContent: 'start' }}>
                        <div
                            className={style.chartInnerContainer}
                            style={{
                                transform: !displayCorrectness ? 'scale(0.85)' : 'scale(1)',
                                opacity: !displayCorrectness ? 0.25 : 1,
                            }}
                        >
                            <SegmentedBar total={correctness.total} correct={correctValue} triggerAnimation={displayCorrectness} />
                            <CheckpointText
                                label={t("game.checkpoint.asClass")}
                                color="var(--success)"
                                alignment="flex-start"
                            >
                                <div className={`${style.innerParagraph} ${style.leftAlignment}`}>
                                    <h1>
                                        {t("game.checkpoint.correctness.title")}
                                    </h1>
                                    <div className={style.score} style={{ color: 'var(--success)' }}>
                                        <p>
                                            {!displayCorrectness ? '0' : correctValue}
                                            <span className={style.subDisplay} style={{ color: "var(--text-dark)" }}>
                                                /{correctness.total}
                                            </span>
                                        </p>
                                    </div>
                                    <p>
                                        {getCorrectnessText()}
                                    </p>
                                </div>
                            </CheckpointText>
                            <span className={`${style.checkpointIcon} ${style.correctness}`}>
                                <ChecklistIcon fontSize="inherit" />
                            </span>
                        </div>
                    </div>
                )}
            </Box>
            <Button
                variant="contained"
                disabled={!done}
                onClick={triggerReveal}
                className={style.revealButton}
                startIcon={<VisibilityIcon />}
            >
                {t("game.checkpoint.next")}
            </Button>
        </Box>
    )
}
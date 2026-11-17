import { Box } from "@mui/material";
import style from './style.module.css';
import { useAtomValue } from "jotai";
import { profileAtom } from "@genaipg/state/profileState";
import { getAllUsers, getTopInfluentialClues, scoreUserAtForm } from "@genaipg/views/Teacher/userState";
import { useMemo, useState } from "react";
import TimelineChart from "@genaipg/components/Charts/Timeline/TimelineChart";
import { Button } from "@genaipg/components/Button/Button";
import InfluentalClues from "./InfluentalClues";
import ClueDialog from "@genaipg/views/dialogs/ClueDialog/ClueDialog";
import { SlideCollage, SlideDemo, SlideImage } from "../types";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from "react-i18next";
import { USER_COLORS } from "./AssignColor";
import { UserTimelineData } from "./types";

interface Props {
    setStep: () => void;
    setTimelineData: (data: UserTimelineData[]) => void;
}

export default function Timeline({ setStep, setTimelineData }: Props) {
    const { t } = useTranslation();

    const profile = useAtomValue(profileAtom);
    const totalCategories = profile?.categories.length ?? 0;
    const clues = useMemo(
        () =>
            profile?.slides.filter(
                slide => slide.type === "demo" || slide.type === "collage" || slide.type === "image"
            ) ?? [],
        [profile]
    );
    const influentialClues = useMemo(() => {
        return getTopInfluentialClues(profile);
    }, [profile])
    const users = useMemo(() => getAllUsers(), []);

    const [open, setOpen] = useState<boolean>(false)
    const [clue, setClue] = useState<SlideDemo | SlideCollage | SlideImage>();
    const [revealTimeline, setRevealTimeline] = useState<'idle' | 'revealing' | 'finished'>('idle');

    const timelineData = useMemo<UserTimelineData[]>(() => {
        return users.map((user, ix) => ({
            userId: user,
            color: USER_COLORS[ix],
            scores: clues.map((clue) => 
                scoreUserAtForm(user, clue.form ?? 0, profile)
            ),
        }));
    }, [users, clues, profile]);

    const startReveal = (state: 'revealing') => {

        if (timelineData.length > 0) {
            setTimelineData(timelineData);
        }

        setRevealTimeline(state);
    }

    const onFinish = () => {
        setRevealTimeline('finished');
    }

    const openDialog = (clue: SlideDemo | SlideCollage | SlideImage) => {
        setClue(clue);
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false)
        setClue(undefined);
    }

    return (
        <Box className={style.container}>
            <ClueDialog isOpen={open} clue={clue} setIsOpen={setOpen} doClose={closeDialog} />
            <h1>
                {t("game.ending.timelineTitle")}
            </h1>

            <Box className={style.innerChartContainer}>
                <Box className={style.chartCard}>
                    <div className={style.chartContainer}>
                        <TimelineChart clues={clues} timelineData={timelineData} totalCategories={totalCategories} playing={revealTimeline === 'revealing'} onFinished={onFinish} />
                    </div>
                </Box>
                <InfluentalClues influentialClues={influentialClues} setOpen={openDialog} revealCards={revealTimeline === 'finished'} />
            </Box>

            <div className={style.buttonGroup}>
                <Button
                    variant="outlined"
                    className={style.revealButton}
                    onClick={setStep}
                    startIcon={<ArrowBackIosNewIcon fontSize="inherit" />}
                >
                    {t("create.buttons.previous")}
                </Button>
                <Button
                    variant="contained"
                    className={style.revealButton}
                    startIcon={<VisibilityRoundedIcon />}
                    onClick={() => startReveal('revealing')}
                    disabled={revealTimeline === 'finished' || revealTimeline === 'revealing'}
                >
                    {t("game.ending.revealTimeline")}
                </Button>
                <Button
                    variant="outlined"
                    className={style.revealButton}
                    disabled={true}
                    endIcon={<ArrowForwardIosIcon />}
                >
                    {t("create.buttons.next")}
                </Button>
            </div>
        </Box>
    )
}
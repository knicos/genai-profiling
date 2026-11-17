import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import style from './style.module.css';
import TimelineChart from "@genaipg/components/Charts/Timeline/TimelineChart";
import { profileAtom } from "@genaipg/state/profileState";
import { useAtom, useAtomValue } from "jotai";
import { timelineAtom, timelinePlayingAtom } from "@genaipg/state/timelineState";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useEffect } from "react";


interface Props {
    isOpen: boolean;
}

export default function TimelineDialog({ isOpen }: Props) {
    const { t } = useTranslation();
    const profile = useAtomValue(profileAtom);
    const clues = profile?.slides.filter((slide) => slide.type === "demo" || slide.type === "collage" || slide.type === "image") ?? [];
    const totalCategories = profile?.categories.length ?? 0;

    const timelineData = useAtomValue(timelineAtom);
    const [playing, setPlaying] = useAtom(timelinePlayingAtom);

    useEffect(() => {
        if (!isOpen) {
            setPlaying(false);
        }
    }, [isOpen, setPlaying]);

    return (
        <>
            <Dialog
                open={isOpen}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                    {t("student.timeline.title")}
                </DialogTitle>
                <DialogContent sx={{ padding: '2rem 0.5rem' }}>
                    <div className={style.content}>
                        <div className={style.subtitle}>
                            <span className={style.icon}>
                                <TrendingUpIcon fontSize="inherit" />
                            </span>
                            <h2>
                                {t("student.timeline.subtitle")}
                            </h2>
                        </div>
                        <div className={style.chartContainer}>
                            <TimelineChart clues={clues} totalCategories={totalCategories} timelineData={timelineData} playing={playing} labels={false}/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
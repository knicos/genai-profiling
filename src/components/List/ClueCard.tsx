import { InfluentialClue } from "@genaipg/views/Teacher/userState";
import { Box, ListItemButton } from "@mui/material"
import style from './style.module.css';
import { useTranslation } from "react-i18next";
import { SlideCollage, SlideDemo, SlideImage } from "../Slide/types";
import { motion } from "framer-motion";
import PlacementChip from "../Chips/PlacementChip";
import PlacementIcon from "../Icons/PlacementIcon";

const MotionListButton = motion.create(ListItemButton);

interface Props {
    type: 'best' | 'second' | 'third' | 'worst';
    clue: InfluentialClue;
    setClue: (clue: SlideDemo | SlideCollage | SlideImage) => void;
    reveal: boolean;
    delay: number;
}

export default function ClueCard({ type, clue, setClue, reveal, delay }: Props) {
    const { t } = useTranslation();

    const addNetChange = (value: number) => {
        if (value > 0) {
            return `+${value}`;
        }

        return `${value}`;
    }

    return (
        <MotionListButton
            className={`${style.cardItem} ${type === 'best' ? style.best : ''} ${type === "worst" ? style.worst : ""}`}
            disabled={!reveal}
            onClick={() => setClue(clue.clue)}
            initial={{
                opacity: 0.4,
                filter: "blur(6px)",
                scale: 0.98,
            }}
            animate={
                reveal
                    ? {
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1,
                    }
                    : {
                        opacity: 0.4,
                        filter: "blur(4px)",
                        scale: 0.95,
                    }
            }
            transition={{
                duration: 0.7,
                delay,
            }}
        >
            <PlacementIcon type={type} />
            <Box className={style.cardContent}>
                <PlacementChip type={type} />
                <Box className={style.cardTitle}>
                    <Box className={style.titleGroup}>
                        <h3>
                            {t("create.clues.clue")} {clue.index}
                        </h3>
                        <p>
                            {t(
                                (type === "worst"
                                    ? clue.studentsWorsened
                                    : clue.studentsImproved) === 1
                                    ? "game.ending.influentialClues.reasoningSingle"
                                    : "game.ending.influentialClues.reasoning",
                                {
                                    count: type === "worst"
                                        ? clue.studentsWorsened
                                        : clue.studentsImproved,
                                }
                            )}
                        </p>
                    </Box>
                    <p
                        style={{
                            color: `
                            ${type === "best" ? 'var(--success)' : ""}
                            ${type === "worst" ? 'var(--error)' : ""}
                        `}}
                    >
                        {t("game.ending.influentialClues.correctCount", { value: addNetChange(clue.netChange) })}
                    </p>
                </Box>
            </Box>
        </MotionListButton>
    )
}
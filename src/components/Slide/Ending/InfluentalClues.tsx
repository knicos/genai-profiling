import { InfluentialClue } from "@genaipg/views/Teacher/userState";
import { Box, List } from "@mui/material";
import ClueCard from "../../List/ClueCard";
import style from './style.module.css';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { SlideCollage, SlideDemo } from "../types";
import { useTranslation } from "react-i18next";


interface Props {
    influentialClues: InfluentialClue[];
    setOpen: (clue: SlideDemo | SlideCollage) => void;
    revealCards: boolean;
}

export default function InfluentalClues({ influentialClues, setOpen, revealCards }: Props) {
    const { t } = useTranslation();

    return (
        <Box className={style.influentialCluesList}>
            <Box
                className={style.categoryContent}
                sx={{ height: '100%' }}
            >
                <div className={style.categoryTop}>
                    <div className={style.influentialCluesTitle}>
                        <span className={style.categoryIcon}>
                            <StarRoundedIcon fontSize="inherit" />
                        </span>
                        <h2>
                            {t("game.ending.influentialClues.title")}
                        </h2>
                    </div>
                </div>

                <List className={style.list}>
                    {influentialClues.map((clue, ix) => (
                        <ClueCard
                            key={ix}
                            type={
                                ix === 0
                                    ? "best"
                                    : clue.netChange < 0 && ix === 2
                                        ? "worst"
                                        : ix === 1
                                            ? "second"
                                            : "third"
                            }
                            clue={clue}
                            setClue={setOpen}
                            reveal={revealCards}
                            delay={ix * 0.7}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    )
}
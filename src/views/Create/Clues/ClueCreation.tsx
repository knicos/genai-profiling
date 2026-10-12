import { Typography } from "@mui/material";
import { Button } from "@genaipg/components/Button/Button";
import { ClueForm } from "./ClueForm";
import style from "./style.module.css";
import { useState  } from "react";
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { ClueData } from "../types";
import { useAtom } from "jotai";
import { cluesAtom } from "@genaipg/state/createState";
import { useTranslation } from "react-i18next";
import ClueSideBar from "./ClueSidebar";

export function ClueCreation() {
    const { t } = useTranslation();
    const [clues, setClues] = useAtom(cluesAtom);
    const [currentClue, setCurrentClue] = useState<string>(
        clues[0]?.id ?? ''
    );

    const currentClueIndex = clues.findIndex(
        clue => clue.id === currentClue
    );

    const goToPrevious = () => {
        if (currentClueIndex <= 0) return;

        setCurrentClue(clues[currentClueIndex - 1].id);
    };

    const goToNext = () => {
        if (currentClueIndex >= clues.length - 1) return;

        setCurrentClue(clues[currentClueIndex + 1].id);
    };

    const updateClue = (data: Partial<ClueData>) => {
        setClues(prev =>
            prev.map(clue =>
                clue.id === currentClue
                    ? { ...clue, ...data }
                    : clue
            )
        );
    };
    
    const currentClueData = clues[currentClueIndex];

    if (!currentClueData) {
        return null;
    }

    return (
        <div className={style.mainContainer}>
            <ClueSideBar
                currentClue={currentClue}
                setCurrentClue={setCurrentClue}
                clues={clues}
            />

            <div className={style.headerContainer}>
                <div className={style.navigationButtons}>
                    <Button
                        variant="contained"
                        onClick={goToPrevious}
                        disabled={currentClueIndex === 0}
                    >
                        <ArrowBackIos />
                    </Button>

                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {t('create.clues.clue')} {currentClueIndex + 1}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={goToNext}
                        disabled={
                            currentClueIndex === clues.length - 1 
                        }
                    >
                        <ArrowForwardIos />
                    </Button>
                </div>

                <ClueForm
                    key={currentClue}
                    data={currentClueData}
                    onChange={updateClue}
                />
            </div>
        </div>
    );
}
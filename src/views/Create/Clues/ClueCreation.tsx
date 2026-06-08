import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Button } from "@genaipg/components/Button/Button";
import { ClueForm } from "./ClueForm";
import style from "./style.module.css";
import { useState, useMemo } from "react";
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import { ClueData } from "../types";
import { useAtom } from "jotai";
import { cluesAtom } from "@genaipg/state/createState";
import { useTranslation } from "react-i18next";

export function ClueCreation() {
    const { t } = useTranslation();
    const [clues, setClues] = useAtom(cluesAtom);
    const [currentClue, setCurrentClue] = useState(0);
    
    const goToPrevious = () => setCurrentClue(i => Math.max(0, i - 1));
    const goToNext = () => setCurrentClue(i => Math.min(clues.length - 1, i + 1));

    const updateClue = (data: Partial<ClueData>) => {
        const newClues = [...clues];
        newClues[currentClue] = { ...newClues[currentClue], ...data };
        setClues(newClues);
    };

    const validateClue = (clue: ClueData) => {
        return clue.visual !== undefined && clue.clue.trim() !== '' && clue.category.length > 0;
    };

    const maxUnlockedIndex = useMemo(() => {
        let i = 0;

        while (i < clues.length && validateClue(clues[i])) {
            i++;
        }

        return i;
    }, [clues]);

    const isButtonDisabled = (id: number) => {
        if (id <= maxUnlockedIndex) return false;

        return true;
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.sidebar}>
                <List sx={{ padding: 0, width: '100%' }}>
                    {clues.map((clue, index) => (
                        <ListItem key={index} className={`${style.listItem} ${clue.id === currentClue ? style.current : ''}`} disablePadding>
                            <ListItemButton
                                disabled={isButtonDisabled(index)}
                                onClick={() => setCurrentClue(index)}
                            >
                                <ListItemText
                                    primary={`${t('create.clues.clue')} ${index + 1}`}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontWeight: clue.id === currentClue ? 'bold' : 'normal'
                                        }
                                    }}
                                />
                                {validateClue(clue) ? <CheckBox color="success" /> : <CheckBoxOutlineBlank htmlColor={clue.id === currentClue ? '#444' : 'disabled'} />}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className={style.headerContainer}>
                <div className={style.navigationButtons}>
                    <Button 
                        variant="contained" 
                        onClick={goToPrevious} disabled={currentClue === 0}
                    >
                        <ArrowBackIos />
                    </Button>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{t('create.clues.clue')} {currentClue + 1}</Typography>
                    <Button 
                        variant="contained" 
                        onClick={goToNext} 
                        disabled={currentClue === clues.length - 1 || validateClue(clues[currentClue]) === false}
                    >
                        <ArrowForwardIos />
                    </Button>
                </div>
                <ClueForm key={currentClue} data={clues[currentClue]} onChange={(data) => {
                    updateClue(data);
                }} />
            </div>
        </div>
    );
}
import style from './style.module.css';
import { ClueData } from "../types";
import Visuals from '@genaipg/components/Slide/Visuals';
import PhoneFrame from '@genaipg/components/Templates/PhoneFrame';
import ImageIcon from '@mui/icons-material/Image';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    clue: ClueData;
    clueIndex: number;
    currentClue: string;
    maxUnlockedIndex: number;
    setCurrentClue: (id: string) => void;
}

export default function ClueItem({ clue, currentClue, clueIndex, maxUnlockedIndex, setCurrentClue }: Props) {
    const { t } = useTranslation();

    const isButtonDisabled = (id: number) => {
        if (id <= maxUnlockedIndex) return false;
        return true;
    };

    return (
        <ListItemButton
            sx={{
                alignItems: 'center',
                gap: '1rem',
                '&:hover': {
                    background: 'none',
                },
            }}
            disabled={isButtonDisabled(clueIndex)}
            onClick={() =>
                setCurrentClue(
                    clue.id
                )
            }
        >
            <ListItemIcon className={style.itemVisual}>
                <div className={style.itemVisualWrapper}>
                    {clue.visual ? (
                        <PhoneFrame>
                            <div className={style.visual}>
                                <Visuals visual={clue.visual} />
                            </div>
                        </PhoneFrame>
                    ) : (
                        <PhoneFrame>
                            <div className={style.noImage}>
                                <ImageIcon fontSize='inherit' />
                            </div>
                        </PhoneFrame>
                    )
                    }
                </div>
            </ListItemIcon>

            <ListItemText
                primary={`${t(
                    'create.clues.clue'
                )} ${clueIndex + 1
                    }`}
                secondary={`${clue.clue.length > 0 ?
                    clue.clue : 'No clue yet'
                    }`}
                sx={{
                    '& .MuiListItemText-primary':
                    {
                        fontWeight:
                            clue.id ===
                                currentClue
                                ? 'bold'
                                : 'normal',
                    },
                }}
            />
        </ListItemButton>
    )
}
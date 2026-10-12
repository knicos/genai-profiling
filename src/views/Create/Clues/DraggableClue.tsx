import { Draggable } from "@hello-pangea/dnd";
import { ClueData } from '../types';
import style from './style.module.css';
import { ListItem } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@genaipg/components/Button/IconButton";
import { useTranslation } from "react-i18next";

interface Props {
    item: ClueData;
    ix: number;
    currentClue: string; 
    removeClue: (clueId: string) => void;
    children: React.ReactNode;
}

export default function DraggableClue({ item, ix, currentClue, removeClue, children }: Props) {
    const { t } = useTranslation();

    return (
        <Draggable
            key={`clue-${item.id}`}
            draggableId={`clue-${item.id}`}
            index={ix}
        >
            {(provided) => (
                <ListItem
                    ref={
                        provided.innerRef
                    }
                    {...provided.draggableProps}
                    className=
                    {`
                        ${style.listItem}
                        ${item.id === currentClue
                            ? style.current
                            : ''
                        }
                    `}
                    disablePadding
                    secondaryAction={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >

                            <span
                                {...provided.dragHandleProps}
                                className={style.dragIndicator}
                            >
                                <DragIndicatorIcon />
                            </span>

                            <IconButton
                                aria-label={t('create.buttons.delete')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeClue(item.id)
                                }}
                            >
                                <DeleteIcon
                                    fontSize="inherit"
                                />
                            </IconButton>

                        </div>
                    }
                >
                    {children}
                </ListItem>
            )}
        </Draggable>
    )
}
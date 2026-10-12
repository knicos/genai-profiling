import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { List } from '@mui/material';
import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { addCheckpointAtom, addClueAtom, deleteCheckpointAtom, deleteClueAtom, editorItemsAtom, reorderEditorItemsAtom } from '@genaipg/state/createState'
import { Button } from '@genai-fi/base';
import { useMemo } from 'react';
import ClueItem from './ClueItem';
import { ClueData } from '../types';
import { useTranslation } from 'react-i18next';
import DraggableClue from './DraggableClue';
import DraggableCheckpoint from './DraggableCheckpoint';

interface Props {
    currentClue: string;
    setCurrentClue: (id: string) => void;
    clues: ClueData[];
}

export default function ClueSideBar({ currentClue, setCurrentClue, clues }: Props) {
    const { t } = useTranslation();
    const addClue = useSetAtom(addClueAtom);
    const addCheckpoint = useSetAtom(addCheckpointAtom);

    const deleteClue = useSetAtom(deleteClueAtom);
    const deleteCheckpoint = useSetAtom(deleteCheckpointAtom);

    const reorder = useSetAtom(reorderEditorItemsAtom);

    const [editorItems] = useAtom(editorItemsAtom);

    const items = useMemo(() => {
        return editorItems
            .map(item => {

                if (item.type === 'clue') {
                    const clue = clues.find(
                        clue => clue.id === item.id
                    );

                    if (!clue) {
                        return null;
                    }

                    return {
                        type: 'clue',
                        clue,
                    };
                }


                return {
                    type: 'checkpoint',
                };
            })
            .filter(
                (
                    item
                ): item is
                    | {
                        type: 'clue';
                        clue: ClueData;
                    }
                    | {
                        type: 'checkpoint';
                    } =>
                    item !== null
            );
    }, [editorItems, clues]);


    const getClueIndex = (itemIndex: number) => {
        return items
            .slice(0, itemIndex)
            .filter(item => item.type === 'clue')
            .length;
    };

    const onDragEnd = (result: DropResult) => {
        const {
            source,
            destination,
        } = result;

        if (!destination) {
            return;
        }

        if (
            source.index === destination.index
        ) {
            return;
        }

        reorder({
            sourceIndex: source.index,
            destinationIndex: destination.index,
        });
    };

    const removeClue = (id: string) => {
        if (currentClue === id) {
            const currentIndex = clues.findIndex(clue => clue.id === id);

            const nextClue =
                clues[currentIndex + 1] ??
                clues[currentIndex - 1];

            if (nextClue) {
                setCurrentClue(nextClue.id);
            }
        }

        deleteClue({ clueId: id });
    };


    return (
        <div className={style.sidebar}>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable
                    droppableId="editor-items"
                >
                    {(provided) => (
                        <List
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                scrollbarWidth: 'none',
                                paddingTop: '15px',
                            }}
                        >

                            {items.map(
                                (item, ix) => {
                                    if (item.type === 'clue') {

                                        const clueIndex =
                                            getClueIndex(ix);

                                        return (
                                            <DraggableClue
                                                key={`clue-${item.clue.id}`}
                                                item={item.clue}
                                                ix={ix}
                                                currentClue={currentClue}
                                                removeClue={removeClue}
                                            >
                                                <ClueItem
                                                    clue={item.clue}
                                                    currentClue={currentClue}
                                                    clueIndex={clueIndex}
                                                    maxUnlockedIndex={clues.length}
                                                    setCurrentClue={setCurrentClue}
                                                />
                                            </DraggableClue>
                                        );
                                    }

                                    return (
                                        <DraggableCheckpoint
                                            key={`checkpoint-${ix}`}
                                            ix={ix}
                                            deleteCheckpoint={deleteCheckpoint}
                                        />
                                    );
                                }
                            )}

                            {provided.placeholder}

                        </List>
                    )}
                </Droppable>

            </DragDropContext>

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addClue()}
                fullWidth
            >
                {t('create.buttons.addClue')}
            </Button>
            <Button
                variant='outlined'
                onClick={() =>
                    addCheckpoint({ clueId: currentClue })
                }
                startIcon={<WhereToVoteIcon />}
            >
                {t('create.buttons.addCheckpoint')}
            </Button>


        </div>
    );
}
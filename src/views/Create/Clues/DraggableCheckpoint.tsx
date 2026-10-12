import { Draggable } from '@hello-pangea/dnd';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@genaipg/components/Button/IconButton';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
    ix: number;
    deleteCheckpoint: (args: { index: number }) => void;
}

export default function DraggableCheckpoint({ ix, deleteCheckpoint }: Props) {
    const { t } = useTranslation();

    return (
        <Draggable
            key={`checkpoint-${ix}`}
            draggableId={`checkpoint-${ix}`}
            index={ix}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={style.checkpoint}
                >
                    <WhereToVoteIcon />
                    <h1>
                        Checkpoint
                    </h1>

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
                            deleteCheckpoint({ index: ix });
                        }}
                    >
                        <CloseIcon
                            fontSize="inherit"
                        />
                    </IconButton>

                </div>
            )}
        </Draggable>
    );
}
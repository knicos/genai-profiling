import { SlideBoard } from './types';
import { getQuestionData, getUserData } from '@genaipg/views/Teacher/userState';
import Board from '../Board/Board';
import { IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import style from './style.module.css';
import { useState } from 'react';

interface Props {
    meta: SlideBoard;
}

export default function BoardSlide({ meta }: Props) {
    const [zoom, setZoom] = useState(1);
    const questions = meta.questions.map((id) => getQuestionData(id));

    return (
        <>
            <Board
                questions={questions}
                data={getUserData()}
                zoom={zoom}
            />
            <div className={style.zoomControls}>
                <IconButton onClick={() => setZoom((old) => old * 1.1)}>
                    <ZoomInIcon />
                </IconButton>
                <IconButton onClick={() => setZoom((old) => old * 0.9)}>
                    <ZoomOutIcon />
                </IconButton>
            </div>
        </>
    );
}

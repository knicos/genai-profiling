import { SlideBoard } from './types';
import { getQuestionData, getUserData } from '@genaipg/views/Teacher/userState';
import Board from '../Board/Board';

interface Props {
    meta: SlideBoard;
}

export default function BoardSlide({ meta }: Props) {
    const questions = meta.questions.map((id) => getQuestionData(id));

    return (
        <Board
            questions={questions}
            data={getUserData()}
        />
    );
}

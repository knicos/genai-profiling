import { SlideQuestion } from './types';
import style from './style.module.css';

interface Props {
    meta: SlideQuestion;
}

export default function QuestionSlide({ meta }: Props) {
    return (
        <div
            className={style.questionSlide}
            style={{ fontSize: `${meta.fontSize || 1}em` }}
        >
            {meta.text}
        </div>
    );
}

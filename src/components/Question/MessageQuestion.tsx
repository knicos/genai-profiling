import { QuestionMessage } from './types';
import style from './style.module.css';

interface Props {
    question: QuestionMessage;
}

export default function MessageQuestion({ question }: Props) {
    return <div className={style[question.size || 'medium']}>{question.text}</div>;
}

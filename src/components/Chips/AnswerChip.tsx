import { useTranslation } from 'react-i18next';
import style from './style.module.css';

interface Props {
    answer: string | string[] | number | null;
    correct?: boolean | null;
}

export default function AnswerChip({ answer, correct }: Props) {
    const { t } = useTranslation();

    return (
        <span 
            className={`${style.answerChip} ${correct ? style.true : ''}`}
        >
            {answer ? answer : t("game.ending.noAnswers")} 
        </span>
    );
}
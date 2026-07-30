import style from './style.module.css';
import AnswerChip from "../Chips/AnswerChip";
import { popularQuestion } from '@genaipg/views/Teacher/userState';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import QuestionCard from '../List/QuestionCard';

interface Props {
    question: popularQuestion;
    revealed: boolean;
}

export default function QuestionResult({ question, revealed }: Props) {

    return (
        <QuestionCard>
            <div className={style.categoryQuestionTitle}>
                {revealed && (
                    question.isCorrect ? (
                        <CheckRoundedIcon htmlColor="var(--success)"/>
                    ) : (
                        <ClearRoundedIcon htmlColor="var(--error)"/>
                    )
                )}
                <h3>
                    {question.text}
                </h3>
            </div>

            <div className={style.answerContent}>
                <AnswerChip answer={question.popular} correct={revealed && question.isCorrect}/>
                {revealed && !question.isCorrect && (
                    <>
                        <ArrowRightAltRoundedIcon fontSize='inherit'/>
                        <AnswerChip answer={question.correct} correct={true}/>
                    </>
                )}
            </div>
        </QuestionCard>
    )
}
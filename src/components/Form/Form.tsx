import { getResponse, updateResponse } from '@genaipg/services/questionLogger/logger';
import Question from '../Question/Question';
import { QuestionData } from '../Question/types';
import style from './style.module.css';

interface Props {
    questions: QuestionData[];
}

export default function Form({ questions }: Props) {
    return (
        <div className={style.container}>
            <section className={style.form}>
                {questions.map((q) => (
                    <Question
                        question={q}
                        value={getResponse(q.id)}
                        onChange={(field, value) => updateResponse(field, value)}
                    />
                ))}
            </section>
        </div>
    );
}

import { getResponse, updateResponse } from '@genaipg/services/questionLogger/logger';
import Question from '../Question/Question';
import { QuestionData } from '../Question/types';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
    questions: QuestionData[];
}

export default function Form({ questions }: Props) {
    const { t } = useTranslation();
    return (
        <div className={style.outerContainer}>
            <div className={style.container}>
                <section className={style.form}>
                    {questions.length === 0 && <div className={style.wait}>{t('pleaseWait')}</div>}
                    {questions.map((q) => (
                        <Question
                            question={q}
                            key={q.id}
                            value={getResponse(q.id)}
                            onChange={(field, value) => updateResponse(field, value)}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}

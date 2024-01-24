import { updateResponse } from '@genaipg/services/questionLogger/logger';
import Question from '../Question/Question';
import { QuestionData } from '../Question/types';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useQuestionResponses } from '@genaipg/services/questionLogger/hook';
import { useCallback } from 'react';

interface Props {
    questions: QuestionData[];
}

export default function Form({ questions }: Props) {
    const { t } = useTranslation();
    const responses = useQuestionResponses(questions);

    const change = useCallback((field: number, value: string) => updateResponse(field, value), []);

    return (
        <div className={style.outerContainer}>
            <div className={style.container}>
                <section className={style.form}>
                    {questions.length === 0 && <div className={style.wait}>{t('pleaseWait')}</div>}
                    {questions.map((q, ix) => (
                        <Question
                            question={q}
                            key={q.id}
                            value={responses[ix]}
                            onChange={change}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}

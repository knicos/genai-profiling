import { updateResponse } from '@genaipg/services/questionLogger/logger';
import Question from '../Question/Question';
import { QuestionData } from '../Question/types';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useQuestionResponses } from '@genaipg/services/questionLogger/hook';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button/Button';

interface Props {
    onDone: (state: boolean) => void;
    questions: QuestionData[];
}

export default function Form({ questions, onDone }: Props) {
    const { t } = useTranslation();
    const [done, setDone] = useState(false);
    const responses = useQuestionResponses(questions);

    const change = useCallback((field: number, value: string) => {
        updateResponse(field, value);
        setDone(false);
    }, []);

    useEffect(() => {
        setDone(false);
    }, [questions]);

    useEffect(() => {
        onDone(done);
    }, [done, onDone]);

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
                    {questions.length > 0 && (
                        <Button
                            variant="contained"
                            onClick={() => setDone(true)}
                            disabled={done}
                        >
                            {t('done')}
                        </Button>
                    )}
                </section>
            </div>
        </div>
    );
}

import { UserState } from '@genaipg/views/Teacher/userState';
import { QuestionData } from '../Question/types';
import style from './style.module.css';
import { PointerEvent, ReactElement } from 'react';

function resultString(question: QuestionData, value?: string | string[] ): ReactElement {
    if (!value) return <span />;

    if (question.type === 'slider') {
        const stringValue = Array.isArray(value) ? value.join(', ') : value;

        if (question.range) {
            const [min, max] = stringValue.split(':');
            return <div className={style.number}>{`${min} - ${max}`}</div>;
        }

        return <div className={style.number}>{stringValue}</div>;
    }

    if (question.type === 'multichoice') {
        const values = Array.isArray(value) ? value : value.split(',');
        return <div>{values.join(', ')}</div>;
    }

    return <div>{Array.isArray(value) ? value.join(', ') : value}</div>;
}

interface Props {
    data: UserState;
    questions: QuestionData[];
    size?: number;
    x?: number;
    y?: number;
    zoom?: number;
    index: number;
    onPointerDown: (e: PointerEvent<HTMLDivElement>, index: number) => void;
}

export default function Postit({ data, questions, onPointerDown, x = 0, y = 0, size = 150, index }: Props) {
    return (
        <div
            className={style.postit}
            style={{
                top: `${y}px`,
                left: `${x}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
            onPointerDown={(e: PointerEvent<HTMLDivElement>) => onPointerDown(e, index)}
        >
            <div className={style.postitContent}>
                <h3>{data.name}</h3>
                <ul>
                    {questions.map((q, ix) => (
                        <li
                            key={ix}
                            style={{ height: questions.length === 1 ? '100%' : undefined }}
                        >
                            {resultString(q /*data.responses.get(q.i)*/)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

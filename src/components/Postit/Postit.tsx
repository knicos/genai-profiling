import { UserState } from '@genaipg/views/Teacher/userState';
import { QuestionData } from '../Question/types';
import style from './style.module.css';
import { PointerEvent } from 'react';

function resultString(question: QuestionData, value?: string): JSX.Element {
    if (!value) return <span></span>;

    if (question.type === 'slider') {
        if (question.range) {
            const s = value.split(':');
            return <div className={style.number}>{`${s[0]} - ${s[1]}`}</div>;
        } else {
            return <div className={style.number}>{value}</div>;
        }
    } else if (question.type === 'multichoice') {
        const s = value.split(',');
        return <div>{s.join(', ')}</div>;
    }

    return <div>{value}</div>;
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
                            {resultString(q, data.responses.get(q.id))}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

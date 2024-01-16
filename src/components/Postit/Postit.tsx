import { UserState } from '@genaipg/views/Teacher/userState';
import { QuestionData } from '../Question/types';
import style from './style.module.css';
import { MouseEvent, useEffect, useRef, useState } from 'react';

function resultString(question: QuestionData, value?: string): JSX.Element {
    if (!value) return <span></span>;

    if (question.type === 'slider') {
        if (question.range) {
            const s = value.split(':');
            return <span className={style.number}>{`${s[0]} - ${s[1]}`}</span>;
        } else {
            return <span className={style.number}>{value}</span>;
        }
    } else if (question.type === 'multichoice') {
        const s = value.split(',');
        return <span>{s.join(', ')}</span>;
    }

    return <span>{value}</span>;
}

interface Props {
    data: UserState;
    questions: QuestionData[];
    size?: number;
    x?: number;
    y?: number;
}

export default function Postit({ data, questions, x = 0, y = 0, size = 150 }: Props) {
    const [pos, setPos] = useState<[number, number]>([0, 0]);
    const startPos = useRef<[number, number, number, number] | undefined>();

    useEffect(() => {
        if (x !== undefined && y !== undefined) {
            setPos([x, y]);
        }
    }, [x, y]);

    const doMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        startPos.current = [e.clientX, e.clientY, ...pos];
    };

    const doMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (startPos.current) {
            e.preventDefault();
            const dx = e.clientX - startPos.current[0];
            const dy = e.clientY - startPos.current[1];
            setPos([dx + startPos.current[2], dy + startPos.current[3]]);
        }
    };

    const doEndDrag = () => {
        startPos.current = undefined;
    };

    return (
        <div
            className={style.postit}
            style={{
                top: `${pos[1]}px`,
                left: `${pos[0]}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
            onPointerDown={doMouseDown}
            onPointerMove={doMouseMove}
            onPointerUp={doEndDrag}
            onPointerLeave={doEndDrag}
        >
            <div className={style.postitContent}>
                <h3>{data.name}</h3>
                <ul>
                    {questions.map((q) => (
                        <li>{resultString(q, data.responses.get(q.id))}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

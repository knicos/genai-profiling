import { UserState } from '@genaipg/views/Teacher/userState';
import { QuestionData } from '../Question/types';
import Postit from '../Postit/Postit';
import style from './style.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import cloudLayout from '@genaipg/util/cloud/cloudLayout';

interface Props {
    data: UserState[];
    questions: QuestionData[];
    zoom?: number;
}

export default function Board({ data, questions, zoom }: Props) {
    const divRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState([0, 0]);
    const [size, setSize] = useState(150);

    useEffect(() => {
        if (data.length >= 8) {
            setSize(150);
        } else if (data.length > 4) {
            setSize(180);
        } else {
            setSize(220);
        }
    }, [data]);

    const layout = useMemo(() => {
        return cloudLayout(
            data.map(() => ({ width: size, height: size, id: '' })),
            500,
            280,
            10
        );
    }, [data, size]);

    useEffect(() => {
        if (divRef.current) {
            setOffset([divRef.current.clientWidth / 2, divRef.current.clientHeight / 2]);
        }
    }, []);

    return (
        <div
            className={style.board}
            ref={divRef}
            style={zoom ? { transform: `scale(${zoom})` } : undefined}
        >
            {questions.length === 1 && <h1>{questions[0].text}</h1>}
            {data.map((d, ix) => (
                <Postit
                    key={ix}
                    data={d}
                    questions={questions}
                    size={size}
                    zoom={zoom}
                    x={layout[0][ix].x + offset[0]}
                    y={layout[0][ix].y + offset[1]}
                />
            ))}
        </div>
    );
}

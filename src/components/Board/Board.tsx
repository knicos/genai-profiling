import { UserState } from '@genaipg/views/Teacher/userState';
import { QuestionData } from '../Question/types';
import Postit from '../Postit/Postit';
import style from './style.module.css';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import cloudLayout from '@genaipg/util/cloud/cloudLayout';

interface Props {
    data: UserState[];
    questions: QuestionData[];
    zoom?: number;
}

export default function Board({ data, questions, zoom = 1 }: Props) {
    const divRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState([0, 0]);
    const [size, setSize] = useState(150);
    const startPos = useRef<[number, number, number, number, number] | undefined>();
    const [positions, setPositions] = useState<[number, number][]>([]);
    const [order, setOrder] = useState<number[]>([]);

    const doMouseDown = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        startPos.current = [e.clientX, e.clientY, positions[index][0], positions[index][1], index];

        // change order
        const newOrder = [...order.filter((v) => v !== index)];
        newOrder.push(index);
        setOrder(newOrder);
    };

    const doMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (startPos.current) {
            e.preventDefault();
            const factor = 1 / zoom;
            const dx = (e.clientX - startPos.current[0]) * factor;
            const dy = (e.clientY - startPos.current[1]) * factor;

            setPositions((old) => {
                if (startPos.current) {
                    const newPos = [...old];
                    newPos[startPos.current[4]] = [dx + startPos.current[2], dy + startPos.current[3]];
                    return newPos;
                }
                return old;
            });
        }
    };

    const doEndDrag = () => {
        startPos.current = undefined;
    };

    useEffect(() => {
        if (data.length >= 8) {
            setSize(150);
        } else if (data.length > 4) {
            setSize(180);
        } else {
            setSize(220);
        }

        setOrder(data.map((_, ix) => ix));
    }, [data]);

    useEffect(() => {
        const layout = cloudLayout(
            data.map(() => ({ width: size, height: size, id: '' })),
            500,
            280,
            10
        );

        setPositions(layout[0].map((l) => [l.x, l.y]));
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
            onPointerMove={doMouseMove}
            onPointerUp={doEndDrag}
            onPointerLeave={doEndDrag}
        >
            {questions.length === 1 && <h1>{questions[0].text}</h1>}
            {order.map((d) => (
                <Postit
                    key={d}
                    index={d}
                    data={data[d]}
                    questions={questions}
                    size={size}
                    onPointerDown={doMouseDown}
                    x={(positions[d]?.[0] || 0) + offset[0]}
                    y={(positions[d]?.[1] || 0) + offset[1]}
                />
            ))}
        </div>
    );
}

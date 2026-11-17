import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ScoreGrid from "./ScoreGrid";
import ClueLabels from "./ClueLabels";
import ChartLines from "./ChartLines";
import { SlideCollage, SlideDemo, SlideImage } from "@genaipg/components/Slide/types";
import { UserTimelineData } from "@genaipg/components/Slide/Ending/types";

const STEP_TRANSITION = { duration: 0.8, ease: "easeInOut" } as const;
const WIDTH = 1000;
const HEIGHT = 500;
const CHART_END = WIDTH - 50;
const CORRECT_Y = 50;
const START_Y = HEIGHT - 50;

type Point = { x: number; y: number };

interface Props {
    timelineData: UserTimelineData[];
    totalCategories: number;
    clues: (SlideDemo | SlideCollage | SlideImage)[];
    playing?: boolean;
    onFinished?: () => void;
    labels?: boolean;
}

export default function TimelineChart({ timelineData, totalCategories, clues, playing, onFinished, labels = true }: Props) {
    const chartStart = labels ? 150 : 50;
    const axisX = labels ? 100 : 3;
    const clueSpacing = clues.length > 1 ? (CHART_END - chartStart) / (clues.length - 1) : 0;

    const [currentClueIndex, setCurrentClueIndex] = useState(-1);

    const userPoints = useMemo(() => {
        return timelineData.map((data, ix) => {
            const lineOffset = (ix - (timelineData.length - 1) / 2) * 3;

            const points: Point[] = [
                { x: labels ? 101 : 1, y: START_Y-2 },
                ...data.scores.map((score, scoreIx) => {
                    return {
                        x: chartStart + scoreIx * clueSpacing,
                        y: START_Y + (CORRECT_Y - START_Y) * score + lineOffset * 0.2 * (1 - score),
                    };
                }),
            ];

            return { user: data.userId, color: data.color, points };
        });
    }, [timelineData, clueSpacing, labels, chartStart]);

    useEffect(() => {
        if (!playing) return;

        setCurrentClueIndex(-1);
        let index = -1;

        const interval = setInterval(() => {
            index++;
            if (index >= clues.length) {
                clearInterval(interval);
                onFinished?.();
                return;
            }
            setCurrentClueIndex(index);
        }, 800);

        return () => clearInterval(interval);
    }, [playing, clues.length, onFinished]);

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            <ScoreGrid start_y={START_Y} correct_y={CORRECT_Y} total={totalCategories} width={WIDTH} labels={labels}/>
            <ClueLabels chartStart={chartStart} clues={clues} spacing={clueSpacing} currentIndex={currentClueIndex} height={HEIGHT} labels={labels}/>

            <motion.line
                x1={labels ? 100 : 0}
                x2={labels ? 100 : 0}
                y1={0}
                y2={START_Y}
                stroke="#ff9800"
                strokeWidth={6}
                animate={{ translateX: currentClueIndex < 0 ? 0 : chartStart + currentClueIndex * clueSpacing - axisX }}
                transition={STEP_TRANSITION}
            />

            {userPoints.map(({ user, color, points }) => (
                <ChartLines key={user} id={user} color={color} points={points} currentIndex={currentClueIndex} />
            ))}
            <line x1={labels ? 100 : 0} y1={0} x2={labels ? 100 : 0} y2={START_Y} stroke="var(--bg-workspace)" strokeWidth={3} />
            <line x1={labels ? 100 : 0} y1={START_Y} x2={WIDTH} y2={START_Y} stroke="var(--bg-workspace)" strokeWidth={3} />
        </svg>
    );
}
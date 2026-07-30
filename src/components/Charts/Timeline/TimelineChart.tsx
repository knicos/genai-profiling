import { useAtomValue } from "jotai";
import { USER_COLORS } from "./AssignColor";
import { profileAtom } from "@genaipg/state/profileState";
import { scoreUserAtForm } from "@genaipg/views/Teacher/userState";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ScoreGrid from "./ScoreGrid";
import ClueLabels from "./ClueLabels";
import ChartLines from "./ChartLines";
import { SlideCollage, SlideDemo } from "@genaipg/components/Slide/types";

const STEP_TRANSITION = { duration: 0.8, ease: "easeInOut" } as const;
const WIDTH = 1000;
const HEIGHT = 500;
const CHART_START = 150;
const CHART_END = WIDTH - 50;
const CORRECT_Y = 50;
const START_Y = HEIGHT - 50;

type Point = { x: number; y: number };

interface Props {
    users: string[];
    totalCategories: number;
    clues: (SlideDemo | SlideCollage)[];
    playing?: boolean;
    onFinished?: () => void;
}

export default function TimelineChart({ users, totalCategories, clues, playing, onFinished }: Props) {
    const profile = useAtomValue(profileAtom);

    const clueSpacing = clues.length > 1 ? (CHART_END - CHART_START) / (clues.length - 1) : 0;

    const [currentClueIndex, setCurrentClueIndex] = useState(-1);

    const userPoints = useMemo(() => {
        return users.map((user, ix) => {
            const lineOffset = (ix - (users.length - 1) / 2) * 3;

            const points: Point[] = [
                { x: 101, y: START_Y-2 },
                ...clues.map((clue, clueIx) => {
                    const score = scoreUserAtForm(user, clue.form ?? 0, profile);
                    return {
                        x: CHART_START + clueIx * clueSpacing,
                        y: START_Y + (CORRECT_Y - START_Y) * score + lineOffset * 0.2 * (1 - score),
                    };
                }),
            ];

            return { user, color: USER_COLORS[ix], points };
        });
    }, [users, clues, profile, clueSpacing]);

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
            <ScoreGrid start_y={START_Y} correct_y={CORRECT_Y} total={totalCategories} width={WIDTH} />
            <ClueLabels chartStart={CHART_START} clues={clues} spacing={clueSpacing} currentIndex={currentClueIndex} height={HEIGHT} />

            <motion.line
                x1={100}
                x2={100}
                y1={0}
                y2={START_Y}
                stroke="#ff9800"
                strokeWidth={6}
                animate={{ translateX: currentClueIndex < 0 ? 0 : CHART_START + currentClueIndex * clueSpacing - 100 }}
                transition={STEP_TRANSITION}
            />

            {userPoints.map(({ user, color, points }) => (
                <ChartLines key={user} id={user} color={color} points={points} currentIndex={currentClueIndex} />
            ))}
            <line x1={100} y1={0} x2={100} y2={START_Y} stroke="var(--bg-workspace)" strokeWidth={3} />
            <line x1={100} y1={START_Y} x2={WIDTH} y2={START_Y} stroke="var(--bg-workspace)" strokeWidth={3} />
        </svg>
    );
}
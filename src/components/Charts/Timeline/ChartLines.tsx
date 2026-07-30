import { motion, Point } from "framer-motion";

function createLinePath(points: Point[]) {
    console.log("recreated m,any times?")
    if (points.length === 0) return "";
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

interface Props {
    id: string;
    color: string;
    points: Point[];
    currentIndex: number;
}

export default function ChartLines({ id, color, points, currentIndex }: Props) {
    const visiblePoints = points.slice(0, currentIndex + 2);
    const completed = visiblePoints.slice(0, -1);
    const segment = visiblePoints.slice(-2);
    const lastPoint = visiblePoints[visiblePoints.length - 1];
    const prevPoint = visiblePoints[visiblePoints.length - 2] ?? lastPoint;

    const completedPath = createLinePath(completed);
    const segmentPath = createLinePath(segment);

    return (
        <g>
            <path d={completedPath} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />

            {segment.length === 2 && (
                <motion.path
                    key={`${id}-${currentIndex}`}
                    d={segmentPath}
                    fill="none"
                    stroke={color}
                    strokeWidth={5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                />
            )}

            {lastPoint && (
                <motion.circle
                    key={`${id}-dot-${currentIndex}`}
                    r={8}
                    fill={color}
                    initial={{ cx: prevPoint.x, cy: prevPoint.y }}
                    animate={{ cx: lastPoint.x, cy: lastPoint.y }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                />
            )}
        </g>
    );
}
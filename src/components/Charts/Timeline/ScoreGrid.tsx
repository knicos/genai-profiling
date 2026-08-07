import { useTranslation } from "react-i18next";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface Props {
    width: number;
    start_y: number;
    correct_y: number;
    total: number;
    labels: boolean;
}

export default function ScoreGrid({ width, start_y, correct_y, total, labels }: Props) {
    const { t } = useTranslation();

    return (
        <>
            {Array.from({ length: total }).map((_, i) => {
                const step = i + 1;
                const score = step / total;
                const y = start_y + (correct_y - start_y) * score;
                const isFinal = step === total;
                const lineColor = isFinal ? "var(--success)" : "#ddd";

                return (
                    <g key={step}>
                        <line x1={labels ? 100 : 0} y1={y} x2={width} y2={y} stroke={lineColor} strokeDasharray="10" strokeWidth={2} />
                        {isFinal && labels && (
                            <foreignObject x={38} y={y - 55} width={40} height={40}>
                                <EmojiEventsIcon sx={{ color: "#f5b301", fontSize: 30 }} />
                            </foreignObject>
                        )}
                        {labels && (
                            <text x={90} y={y + 2} fontSize={12} textAnchor="end" fill={lineColor}>
                                {isFinal ? t("game.ending.correctProfile") : `${step} ${t("game.ending.correctTitle")}`}
                            </text>
                        )}
                    </g>
                );
            })}
        </>
    );
}
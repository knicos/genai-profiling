import { SlideCollage, SlideDemo, SlideImage } from "@genaipg/components/Slide/types";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
    clues: (SlideCollage | SlideDemo | SlideImage)[];
    currentIndex: number;
    spacing: number;
    chartStart: number;
    height: number;
    labels: boolean;
}

export default function ClueLabels({ clues, currentIndex, spacing, chartStart, height, labels } : Props) {
    const { t } = useTranslation();

    return (
        <>
            {clues.map((_, ix) => (
                <motion.text
                    key={ix}
                    x={chartStart + ix * spacing}
                    y={height - 15}
                    textAnchor="middle"
                    fontSize="medium"
                    fill="var(--bg-dark)"
                    animate={{ fill: currentIndex >= ix ? "var(--border-grey)" : "var(--bg-dark)" }}
                    transition={{
                        duration: 0.3, 
                        ease: "easeInOut"
                    }}
                >
                    {labels && t("create.clues.clue")}  {ix + 1}
                </motion.text>
            ))}
        </>
    );
}

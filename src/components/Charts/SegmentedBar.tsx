import { Box } from "@mui/material";
import style from './style.module.css';

interface Props {
    triggerAnimation: boolean;
    correct: number;
    total: number;
}

export default function SegmentedBar({ correct, total, triggerAnimation }: Props) {
   
    return (
        <Box
            className={style.segmentedChart}
        >
            {Array.from({ length: total }).map((_, i) => (
                <Box
                    key={i}
                    className={style.segment}
                >
                    <Box
                        className={`
                            ${style.correct} 
                            ${triggerAnimation && i < correct ? style.active : ""}
                        `}
                        sx={{
                            transitionDelay: `${i*0.3}s`
                        }}
                    />
                </Box>
            ))}
        </Box>
    )
}
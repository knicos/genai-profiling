import { Stack } from "@mui/material";
import style from "./style.module.css";

interface Props {
    index: number;
    total: number;
}

export default function LoadingBar({ index, total }: Props) {
    return (
        <Stack direction="row" className={style.stack}>
            {Array.from({ length: total }).map((_, ix) => (
                <div
                    key={ix}
                    className={`${style.segment} ${style.dark} ${ix < index ? style.pastDark : ""}`}
                />
            ))}
        </Stack>
    );
}
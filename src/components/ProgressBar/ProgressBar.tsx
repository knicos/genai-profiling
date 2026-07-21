import Check from '@mui/icons-material/Check';
import { Stack } from "@mui/material";
import style from './style.module.css'
import { SlideMeta } from "../Slide/types";

// TODO: Better the logic: depended on some kind of information: form: {[slides], [break], [slides]} etc.

interface Props {
    index: number;
    slides: SlideMeta[];
}

export function ProgressBar({ index, slides }: Props) {

    return (
        <Stack direction="row" className={style.stack}>
            {slides.map((slide, ix) =>
                slide.type === 'checkpoint' ? (
                    <div
                        key={ix}
                        className={`${style.separator} ${index == ix ? style.selected : ""} ${index > ix ? style.past : ""}`}
                    >
                        <Check fontSize="inherit" />
                    </div>
                ) : (
                    <div
                        key={ix}
                        className={`${style.segment} ${ix == index ? style.selected : ""} ${ix < index ? style.past : ""
                            }`}
                    />
                )
            )}
        </Stack>
    )
}
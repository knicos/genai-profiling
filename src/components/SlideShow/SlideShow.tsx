import { IconButton } from '@mui/material';
import Slide from '../Slide/Slide';
import { SlideMeta } from '../Slide/types';
import style from './style.module.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface Props {
    index: number;
    slides: SlideMeta[];
    showControls?: boolean;
    hasNext?: boolean;
    onChange?: (index: number) => void;
}

export default function SlideShow({ index, slides, showControls, onChange, hasNext }: Props) {
    return (
        <div className={style.container}>
            {index >= 0 && index < slides.length ? <Slide meta={slides[index]} /> : null}
            {showControls && (
                <div className={style.controls}>
                    <IconButton
                        size="large"
                        color="inherit"
                        disabled={index === 0}
                        onClick={() => {
                            if (onChange) onChange(index - 1);
                        }}
                    >
                        <NavigateBeforeIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        size="large"
                        color="inherit"
                        disabled={!hasNext}
                        onClick={() => {
                            if (onChange) onChange(index + 1);
                        }}
                    >
                        <NavigateNextIcon fontSize="large" />
                    </IconButton>
                </div>
            )}
        </div>
    );
}

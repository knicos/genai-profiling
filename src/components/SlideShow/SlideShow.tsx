import Slide from '../Slide/Slide';
import { SlideMeta } from '../Slide/types';
import style from './style.module.css';

interface Props {
    index: number;
    slides: SlideMeta[];
    showControls?: boolean;
    onChange?: (index: number) => void;
}

export default function SlideShow({ index, slides, showControls }: Props) {
    return (
        <div className={style.container}>
            {index >= 0 && index < slides.length ? <Slide meta={slides[index]} /> : null}
            {showControls && <div className={style.controls}></div>}
        </div>
    );
}

import { SlideImage } from './types';
import style from './style.module.css';

interface Props {
    meta: SlideImage;
}

export default function ImageSlide({ meta }: Props) {
    return (
        <div className={style.image}>
            <img
                src={meta.url}
                alt={meta.label || ''}
            />
            {meta.label && <h2>{meta.label}</h2>}
        </div>
    );
}

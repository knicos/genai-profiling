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
                style={meta.scale !== undefined ? { height: `${Math.floor(meta.scale * 100)}%` } : undefined}
            />
            {meta.label && <h2>{meta.label}</h2>}
        </div>
    );
}

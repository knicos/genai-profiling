import { SlideMeta } from './types';
import style from './style.module.css';

interface Props {
    meta: SlideMeta;
}

export default function Slide({ meta }: Props) {
    console.log(meta);
    return (
        <div className={style.slide}>
            <div>{meta.type}</div>
        </div>
    );
}

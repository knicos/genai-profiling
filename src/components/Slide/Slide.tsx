import { SlideMeta } from './types';
import style from './style.module.css';
import QuestionSlide from './QuestionSlide';

interface Props {
    meta: SlideMeta;
}

export default function Slide({ meta }: Props) {
    console.log(meta);
    return <div className={style.slide}>{meta.type === 'question' && <QuestionSlide meta={meta} />}</div>;
}

import { SlideMeta } from './types';
import QuestionSlide from './QuestionSlide';
import SlideContainer from './SlideContainer';

interface Props {
    meta: SlideMeta;
}

export default function Slide({ meta }: Props) {
    return <SlideContainer>{meta.type === 'question' && <QuestionSlide meta={meta} />}</SlideContainer>;
}

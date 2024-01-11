import { SlideMeta } from './types';
import QuestionSlide from './QuestionSlide';
import SlideContainer from './SlideContainer';
import ImageSlide from './ImageSlide';

interface Props {
    meta: SlideMeta;
}

export default function Slide({ meta }: Props) {
    return (
        <SlideContainer>
            {meta.type === 'question' && <QuestionSlide meta={meta} />}
            {meta.type === 'image' && <ImageSlide meta={meta} />}
        </SlideContainer>
    );
}

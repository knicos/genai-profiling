import { SlideMeta } from './types';
import QuestionSlide from './QuestionSlide';
import SlideContainer from './SlideContainer';
import ImageSlide from './ImageSlide';
import BoardSlide from './BoardSlide';
import Done from './Done';

interface Props {
    meta: SlideMeta;
    doneCount?: number;
}

export default function Slide({ meta, doneCount }: Props) {
    return (
        <SlideContainer>
            {meta.type === 'question' && <QuestionSlide meta={meta} />}
            {meta.type === 'image' && <ImageSlide meta={meta} />}
            {meta.type === 'board' && <BoardSlide meta={meta} />}
            {meta.form !== undefined && meta.form >= 0 && <Done count={doneCount || 0} />}
        </SlideContainer>
    );
}

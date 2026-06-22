import { SlideMeta } from './types';
import QuestionSlide from './QuestionSlide';
import SlideContainer from './SlideContainer';
import ImageSlide from './ImageSlide';
import BoardSlide from './BoardSlide';
import Done from './Done';
import DemoSlide from './DemoSlide';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { CheckpointSlide } from './CheckpointSlide';

interface Props {
    index: number;
    slides: SlideMeta[];
    meta: SlideMeta;
    doneCount?: number;
}

export default function Slide({ meta, slides, doneCount, index }: Props) {
    return (
        <SlideContainer>
            <ProgressBar index={index} slides={slides}/>
            {meta.type === 'demo' && <DemoSlide meta={meta} />}
            {meta.type === 'question' && <QuestionSlide meta={meta} />}
            {meta.type === 'checkpoint' && <CheckpointSlide />}
            {meta.type === 'image' && <ImageSlide meta={meta} />}
            {meta.type === 'board' && <BoardSlide meta={meta} />}
            {meta.form !== undefined && meta.form >= 0 && <Done count={doneCount || 0} />}
        </SlideContainer>
    );
}

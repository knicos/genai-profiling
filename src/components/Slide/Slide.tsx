import { SlideMeta } from './types';
import QuestionSlide from './QuestionSlide';
import SlideContainer from './SlideContainer';
import ImageSlide from './ImageSlide';
import BoardSlide from './BoardSlide';
import Done from './Done';
import DemoSlide from './DemoSlide';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { CheckpointSlide } from './CheckpointSlide';
import EndingSlide from './EndingSlide';
import CollageSlide from './CollageSlide';
import { UserTimelineData } from './Ending/types';

interface Props {
    index: number;
    slides: SlideMeta[];
    meta: SlideMeta;
    doneCount?: number;
    userCount?: number;
    changeForm?: (formIndex: number) => void;
    setTimelineData?: (data: UserTimelineData[]) => void;
}

export default function Slide({ meta, slides, doneCount, userCount, index, changeForm, setTimelineData }: Props) {
    
    return (
        <SlideContainer>
            <ProgressBar index={index} slides={slides}/>
            {meta.type === 'demo' && <DemoSlide meta={meta} />}
            {meta.type === 'question' && <QuestionSlide meta={meta} />}
            {meta.type === 'checkpoint' && meta.form && <CheckpointSlide form={meta.form}/>}
            {meta.type === 'image' && <ImageSlide meta={meta} />}
            {meta.type === 'board' && <BoardSlide meta={meta} />}
            {meta.type === 'ending' && setTimelineData && <EndingSlide steps={meta.steps} onChange={(formIndex: number) => changeForm && changeForm(formIndex)} setTimelineData={setTimelineData} />}
            {meta.type === 'collage' && <CollageSlide />}
            {meta.form !== undefined && meta.form >= 0 && <Done count={doneCount || 0} userCount={userCount || 0}/>}
        </SlideContainer>
    );
}

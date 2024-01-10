import { SlideQuestion } from './types';

interface Props {
    meta: SlideQuestion;
}

export default function QuestionSlide({ meta }: Props) {
    return <div style={{ fontSize: `${meta.fontSize || 1}em` }}>{meta.text}</div>;
}

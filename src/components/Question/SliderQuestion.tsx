import { QuestionSlider } from './types';
import SliderField from '../FormFields/SliderField';

interface Props {
    question: QuestionSlider;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function SliderQuestion({ question, value, onChange }: Props) {
    return (
        <SliderField
            label={question.text}
            min={question.min}
            max={question.max}
            step={question.step}
            range={question.range}
            value={value}
            onChange={v => onChange(question.id, v)}
        />

    );
}

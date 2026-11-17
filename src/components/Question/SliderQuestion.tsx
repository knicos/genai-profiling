import { QuestionSlider } from './types';
import SliderField from '../FormFields/SliderField';
import { FONT_SIZE } from '@genaipg/style/typography';

interface Props {
    question: QuestionSlider;
    value: string;
    onChange: (field: string, value: string) => void;
    disabled?: boolean;
}

export default function SliderQuestion({ question, value, onChange, disabled }: Props) {
    return (
        <SliderField
            label={question.text}
            min={question.min}
            max={question.max}
            step={question.step}
            range={question.range}
            value={value}
            onChange={v => onChange(question.id, v)}
            disabled={disabled}
            normal={true}
            fontSize={FONT_SIZE.medium}
        />

    );
}

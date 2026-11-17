import { QuestionChoice } from './types';
import SelectField from '../FormFields/SelectField';
import { FONT_SIZE } from '@genaipg/style/typography';

interface Props {
    question: QuestionChoice;
    value: string;
    onChange: (field: string, value: string) => void;
    disabled?: boolean;
}

export default function SingleQuestion({ question, value, onChange, disabled }: Props) {
    return (
        <SelectField 
            label={question.text}
            options={question.options}
            value={value}
            onChange={v => onChange(question.id, v)}
            placeholder={question.default}
            disabled={disabled}
            normal={true}
            fontSize={FONT_SIZE.medium}
        />
    );
}

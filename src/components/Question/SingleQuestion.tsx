import { QuestionChoice } from './types';
import SelectField from '../FormFields/SelectField';

interface Props {
    question: QuestionChoice;
    value: string;
    onChange: (field: number, value: string) => void;
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
        />
    );
}

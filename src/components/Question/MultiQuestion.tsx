import { QuestionMulti } from './types';
import MultiChoice from '../FormFields/MultiChoice';

interface Props {
    question: QuestionMulti;
    value: string[];
    onChange: (field: string, value: string[]) => void;
    disabled?: boolean;
}

export default function MultiQuestion({ question, value, onChange, disabled }: Props) {

    return (
        <MultiChoice 
            label={question.text}
            options={question.options}
            onChange={v => onChange(question.id, v)}
            value={value}
            disabled={disabled}
        />
    );
}

import { QuestionMulti } from './types';
import MultiChoice from '../FormFields/MultiChoice';

interface Props {
    question: QuestionMulti;
    value: string[];
    onChange: (field: number, value: string[]) => void;
}

export default function MultiQuestion({ question, value, onChange }: Props) {

    return (
        <MultiChoice 
            label={question.text}
            options={question.options}
            onChange={v => onChange(question.id, v)}
            value={value}
        />
    );
}

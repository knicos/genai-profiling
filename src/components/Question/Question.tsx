import { QuestionData } from './types';
import TextQuestion from './TextQuestion';
import LargeQuestion from './LargeQuestion';
import SliderQuestion from './SliderQuestion';
import MultiQuestion from './MultiQuestion';
import SingleQuestion from './SingleQuestion';
import MessageQuestion from './MessageQuestion';

interface Props {
    question: QuestionData;
    value: string | string[];
    onChange: (field: number, value: string | string[]) => void;
    disabled?: boolean;
}

export default function Question({ question, value, onChange, disabled }: Props) {
    switch (question.type) {
        case 'text':
            return (
                <TextQuestion
                    question={question}
                    value={Array.isArray(value) ? value[0] ?? '' : value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );
        case 'largetext':
            return (
                <LargeQuestion
                    question={question}
                    value={Array.isArray(value) ? value[0] ?? '' : value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );
        case 'slider':
            return (
                <SliderQuestion
                    question={question}
                    value={Array.isArray(value) ? value[0] ?? '' : value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );
        case 'multichoice':
            return (
                <MultiQuestion
                    question={question}
                    value={Array.isArray(value) ? value : value ? value.split(',') : []}
                    onChange={onChange}
                    disabled={disabled}
                />
            );

        case 'singlechoice':
            return (
                <SingleQuestion
                    question={question}
                    value={Array.isArray(value) ? value[0] : value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );
        case 'message':
            return <MessageQuestion question={question} />;
        default:
            return null;
    }
}

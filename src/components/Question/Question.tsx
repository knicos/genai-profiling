import { QuestionData } from './types';
import TextQuestion from './TextQuestion';
import LargeQuestion from './LargeQuestion';
import SliderQuestion from './SliderQuestion';
import MultiQuestion from './MultiQuestion';
import SingleQuestion from './SingleQuestion';
import MessageQuestion from './MessageQuestion';

interface Props {
    question: QuestionData;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function Question({ question, value, onChange }: Props) {
    switch (question.type) {
        case 'text':
            return (
                <TextQuestion
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case 'largetext':
            return (
                <LargeQuestion
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case 'slider':
            return (
                <SliderQuestion
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case 'multichoice':
            return (
                <MultiQuestion
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );

        case 'singlechoice':
            return (
                <SingleQuestion
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case 'message':
            return <MessageQuestion question={question} />;
        default:
            return null;
    }
}

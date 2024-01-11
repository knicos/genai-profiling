import { Slider, Typography } from '@mui/material';
import { QuestionSlider } from './types';

interface Props {
    question: QuestionSlider;
    value: string;
    onChange: (field: number, value: string) => void;
}

function parseRange(value: string, question: QuestionSlider) {
    if (value) {
        const s = value.split(':');
        if (s.length === 2) {
            return [parseInt(s[0]), parseInt(s[1])];
        }
    }
    return [question.min, question.max];
}

function joinRange(value: number | number[]) {
    if (Array.isArray(value)) {
        return value.join(':');
    } else {
        return `${value}`;
    }
}

export default function SliderQuestion({ question, value, onChange }: Props) {
    return (
        <div>
            <Typography
                variant="body1"
                component="h2"
                gutterBottom
            >
                {question.text}
            </Typography>
            <Slider
                style={{ marginTop: '2rem' }}
                defaultValue={question.range ? parseRange(value, question) : Number(value) || question.min}
                onChangeCommitted={(_, val) => onChange(question.id, joinRange(val))}
                aria-labelledby="input-slider"
                min={question.min}
                max={question.max}
                valueLabelDisplay="on"
                step={1}
            />
        </div>
    );
}

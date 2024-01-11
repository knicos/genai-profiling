import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { QuestionChoice } from './types';

interface Props {
    question: QuestionChoice;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function SingleQuestion({ question, value, onChange }: Props) {
    return (
        <div>
            <Typography
                variant="body1"
                component="h2"
                gutterBottom
            >
                {question.text}
            </Typography>
            <FormControl>
                <RadioGroup
                    defaultValue={value || question.default || question.options?.[0] || 'none'}
                    name={`radio-group-${question.id}`}
                    onBlur={(e) => {
                        const v = (e.target as HTMLInputElement).value;
                        onChange(question.id, v);
                    }}
                >
                    {question.options.map((opt, ix) => (
                        <FormControlLabel
                            value={opt}
                            key={ix}
                            control={<Radio />}
                            label={opt}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
}

import { TextField, Typography } from '@mui/material';
import { QuestionText } from './types';
import { useEffect, useRef } from 'react';

interface Props {
    question: QuestionText;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function TextQuestion({ question, value, onChange }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const r = ref.current;
        return () => {
            if (r && r.value && r.value !== '') {
                onChange(question.id, r.value);
            }
        };
    }, [onChange, question]);

    return (
        <div>
            <Typography
                variant="body1"
                component="h2"
                gutterBottom
            >
                {question.text}
            </Typography>
            <TextField
                inputRef={ref}
                fullWidth
                margin="normal"
                defaultValue={value}
                onBlur={(e) => onChange(question.id, e.target.value)}
            />
        </div>
    );
}

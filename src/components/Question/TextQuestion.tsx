import { TextField, Typography } from '@mui/material';
import { QuestionText } from './types';

interface Props {
    question: QuestionText;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function TextQuestion({ question, value, onChange }: Props) {
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
                fullWidth
                margin="normal"
                defaultValue={value}
                onBlur={(e) => onChange(question.id, e.target.value)}
            />
        </div>
    );
}

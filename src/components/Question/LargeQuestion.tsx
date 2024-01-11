import { TextField, Typography } from '@mui/material';
import { QuestionLargeText } from './types';

interface Props {
    question: QuestionLargeText;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function LargeQuestion({ question, value, onChange }: Props) {
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
                multiline
                minRows={3}
                maxRows={10}
            />
        </div>
    );
}

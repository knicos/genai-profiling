import { TextField, Typography } from '@mui/material';
import { QuestionText } from './types';

interface Props {
    question: QuestionText;
    value: string;
    onChange: (field: string, value: string) => void;
    disabled?: boolean;
}

export default function TextQuestion({ question, value, onChange, disabled }: Props) {
  

    return (
        <div style={{ width: '100%' }}>
            <Typography
                variant="body1"
                component="h2"
                color="#444"
                gutterBottom
            >
                {question.text}
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                defaultValue={value}
                onBlur={(e) => onChange(question.id, e.target.value)}
                disabled={disabled}
                multiline
                minRows={2}
            />
        </div>
    );
}

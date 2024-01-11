import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { QuestionMulti } from './types';
import { useRef } from 'react';

interface Props {
    question: QuestionMulti;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function MultiQuestion({ question, value, onChange }: Props) {
    const checkedSet = useRef(new Set<string>());

    return (
        <div>
            <Typography
                variant="body1"
                component="h2"
                gutterBottom
            >
                {question.text}
            </Typography>
            {question.options.map((opt, ix) => (
                <FormControlLabel
                    key={ix}
                    control={
                        <Checkbox
                            defaultChecked={value === 'true'}
                            onBlur={(e) => {
                                const value = (e.target as HTMLInputElement).checked;
                                if (value) checkedSet.current.add(opt);
                                else checkedSet.current.delete(opt);
                                onChange(question.id, Array.from(checkedSet.current).join(','));
                            }}
                        />
                    }
                    label={opt}
                />
            ))}
        </div>
    );
}

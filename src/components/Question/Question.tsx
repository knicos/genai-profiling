import {
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Typography,
} from '@mui/material';
import { QuestionData } from './types';

interface Props {
    question: QuestionData;
    value: string;
    onChange: (field: number, value: string) => void;
}

export default function Question({ question, value, onChange }: Props) {
    switch (question.type) {
        case 'text':
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
                        label={question.text}
                        margin="normal"
                        defaultValue={value}
                        onBlur={(e) => onChange(question.id, e.target.value)}
                    />
                </div>
            );
        case 'slider':
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
                        defaultValue={Number(value) || question.min}
                        onChangeCommitted={(_, val) => onChange(question.id, `${val as number}`)}
                        aria-labelledby="input-slider"
                        min={question.min}
                        max={question.max}
                        valueLabelDisplay="auto"
                        step={1}
                    />
                </div>
            );
        case 'multichoice':
            return (
                <div>
                    <Typography
                        variant="body1"
                        component="h2"
                        gutterBottom
                    >
                        {question.text}
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            defaultValue={value || ''}
                            onBlur={(e) => onChange(question.id, e.target.value)}
                            displayEmpty
                        >
                            <MenuItem
                                value=""
                                disabled
                            >
                                Select an option
                            </MenuItem>
                            {question.options?.map((option: string) => (
                                <MenuItem
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            );

        case 'singlechoice':
            return (
                <div>
                    <Typography
                        variant="body1"
                        component="h2"
                        gutterBottom
                    >
                        {question.text}
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked={value === 'true'}
                                onBlur={(e) => onChange(question.id, e.currentTarget.value ? 'true' : 'false')}
                            />
                        }
                        label="Yes"
                    />
                </div>
            );
        default:
            return null;
    }
}

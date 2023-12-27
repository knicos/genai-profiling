import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Slider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type Question = {
    id: string;
    text: string;
    type: string;
    min?: number;
    max?: number;
    options?: string[];
};

type QuestionState = {
    [key: string]: string | number | boolean;
};

type QuestionProps = {
    question: Question;
    value: QuestionState;
    onChange: (field: string, value: string | number | boolean) => void;
};

const Question: React.FC<QuestionProps> = ({ question, value, onChange }) => {
    switch (question.type) {
        case 'text':
            return (
                <>
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
                        value={value[question.id] || ''}
                        onChange={(e) => onChange(question.id, e.target.value)}
                    />
                </>
            );
        case 'slider':
            return (
                <>
                    <Typography
                        variant="body1"
                        component="h2"
                        gutterBottom
                    >
                        {question.text}
                    </Typography>
                    <Slider
                        value={Number(value[question.id]) || question.min}
                        onChange={(_, val) => onChange(question.id, val as number)}
                        aria-labelledby="input-slider"
                        min={question.min}
                        max={question.max}
                        valueLabelDisplay="auto"
                        marks
                        step={1}
                    />
                </>
            );
        case 'mcq':
            return (
                <>
                    <Typography
                        variant="body1"
                        component="h2"
                        gutterBottom
                    >
                        {question.text}
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={value[question.id] || ''}
                            onChange={(e) => onChange(question.id, e.target.value)}
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
                </>
            );

        case 'checkbox':
            return (
                <>
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
                                checked={!!value[question.id]}
                                onChange={(e) => onChange(question.id, e.target.checked)}
                            />
                        }
                        label="Yes"
                    />
                </>
            );
        default:
            return null;
    }
};

export function Component() {
    const [questionsData, setQuestionsData] = useState<Question[]>([]);
    const [questionPage, setQuestionPage] = useState(0);
    const [responses, setResponses] = useState<QuestionState>({});
    const { t } = useTranslation();

    useEffect(() => {
        import('./questions.json')
            .then((data) => {
                console.log('Loaded questions data:', data.default);
                setQuestionsData(data.default);
            })
            .catch((error) => console.error('Error loading questions:', error));
    }, []);

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [field]: value,
        }));
    };

    const questionsPerPage = 5; // Update to 5 questions per page
    const numberOfPages = Math.ceil(questionsData.length / questionsPerPage);

    const currentPageQuestions = questionsData.slice(
        questionPage * questionsPerPage,
        (questionPage + 1) * questionsPerPage
    );
    const isLastPage = questionPage === numberOfPages - 1;

    const allFieldsFilled = currentPageQuestions.every((q) => responses[q.id] !== undefined && responses[q.id] !== '');

    const handleNextPage = () => {
        if (questionPage < numberOfPages - 1) {
            setQuestionPage(questionPage + 1);
        }
    };

    const handleSubmit = () => {
        console.log('Submitted data:', responses);
        // Handle form submission
    };

    return (
        <>
            <Container
                maxWidth="md"
                style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
            >
                <img
                    src="/logo64_bw.png"
                    alt="GenAI logo"
                    width={100}
                    height={100}
                />
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                >
                    {t('Please Answer all the Question')}
                </Typography>
                <FormGroup style={{ flex: 1 }}>
                    {currentPageQuestions.map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                            value={responses}
                            onChange={handleInputChange}
                        />
                    ))}
                </FormGroup>

                <div style={{ marginTop: 'auto' }}>
                    {isLastPage ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={!allFieldsFilled}
                        >
                            {t('Submit')}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleNextPage}
                            disabled={!allFieldsFilled}
                        >
                            {t('Next')}
                        </Button>
                    )}
                </div>
            </Container>
        </>
    );
}

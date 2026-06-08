import Question from "@genaipg/components/Question/Question";
import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import { Typography } from "@mui/material";
import ChevronLeft  from "@mui/icons-material/ChevronLeft";
import { Button } from "@genai-fi/base";

interface Props {
    category: Category;
    goBack?: () => void;
}

export default function QuestionView({ category, goBack }: Props) {
    return (
        <div className={style.container}>
            <div className={style.topBar}>
                <Button
                    variant="contained"
                    sx={{ minWidth: '32px', padding: '6px' }}
                    onClick={goBack}>
                    <ChevronLeft color="inherit" />
                </Button>
                <span className={style.categoryTitle}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{category.category}</Typography>
                </span>
            </div>
            <div
                className={style.questionContainer}
            >
                {category.questions.map((q, ix) => (
                    <Question
                        key={ix}
                        question={q}
                        value={''}
                        onChange={() => {/*TODO: Add action*/}}
                    />
                ))}
            </div>
        </div>
    )
}
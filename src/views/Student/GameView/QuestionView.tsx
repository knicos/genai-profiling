import Question from "@genaipg/components/Question/Question";
import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import { IconButton, List } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from '@mui/icons-material/ChevronRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from "@genai-fi/base";
import { useAtomValue } from "jotai";
import { responseAtom } from "@genaipg/state/responseState";
import QuestionCard from "@genaipg/components/List/QuestionCard";
import { useTranslation } from "react-i18next";

interface Props {
    category: Category;
    currentIndex: number;
    totalCategories: number;
    goBack: () => void;
    goPrevious: (index: number) => void;
    goNext: (index: number) => void;
    change?: (categoryId: number, questionId: number, values: string | string[]) => void;
    disabled?: boolean;
}

export default function QuestionView({ category, currentIndex, totalCategories, goBack, goNext, goPrevious, change, disabled }: Props) {
    const { t } = useTranslation();
    const responses = useAtomValue(responseAtom)[category.id] ?? {};

    return (
        <div className={style.container}>
            <div className={style.innerContainer}>
                <div className={style.topBar}>
                    <IconButton
                        aria-label={t("create.buttons.back")}
                        className={style.backButton}
                        onClick={goBack}
                    >
                        <KeyboardBackspaceIcon color="inherit" />
                    </IconButton>
                    <span className={style.categoryTitle}>
                        <h1>{category.category}</h1>
                    </span>
                </div>
                <List
                    className={style.questionContainer}
                >
                    {category.questions.map((q, ix) => (
                        <QuestionCard key={ix}>
                            <Question
                                question={q}
                                value={responses[q.id] ?? ''}
                                onChange={(field, value) => change?.(category.id, field, value)}
                                disabled={disabled}
                            />
                        </QuestionCard>

                    ))}
                </List>
            </div>
            <div className={style.navigationFooter}>
                <Button
                    aria-label={t("create.buttons.previous")}
                    variant="contained"
                    sx={{ minWidth: '32px', padding: '6px' }}
                    onClick={() => goPrevious(currentIndex - 1)}
                    disabled={currentIndex <= 0}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    aria-label={t("create.buttons.next")}
                    variant="contained"
                    sx={{ minWidth: '32px', padding: '6px' }}
                    onClick={() => goNext(currentIndex + 1)}
                    disabled={currentIndex === totalCategories - 1}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}
import ListCard from "@genaipg/components/List/ListCard";
import Check from '@mui/icons-material/Check';
import Edit from '@mui/icons-material/Edit';
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import { Button } from "@genai-fi/base";
import style from './style.module.css';
import { Category, QuestionData } from "@genaipg/components/Question/types";
import { useSetAtom } from "jotai";
import { deleteQuestion } from "@genaipg/state/createState";
import { List } from "@mui/material";

interface Props {
    category: Category;
    handleEdit: (category: string, question: QuestionData) => void;
}

export function QuestionsList({ category, handleEdit }: Props) {
    const handleDelete = useSetAtom(deleteQuestion);


    return (
        <List>
            {category.questions.map((question) => (
                    <ListCard
                        key={question.id}
                        label={question.text}
                    >
                        <span className={style.tag} style={{ background: 'var(--secondaryLight)', color: 'black' }}>
                            {question.type}
                        </span>
                        {'correct' in question ? (
                            <span className={style.tag}>
                                <Check fontSize="inherit" />
                                {Array.isArray(question.correct)
                                    ? question.correct.join(', ')
                                    : question.correct}
                            </span>
                        ) : null}
                        <Button
                            variant="outlined"
                            onClick={() => handleDelete({ categoryId: category.category, questionId: question.id })}
                        >
                            <DeleteOutline />
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleEdit(category.category, question)}
                        >
                            <Edit />
                        </Button>
                    </ListCard>
            ))}
         </List>
    )
}
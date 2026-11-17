import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { Button } from "@genai-fi/base";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import style from "./style.module.css";

interface Props {
    values: string[];
    correct: string[] | string;
    handleChange: (field: string, value: string | string[]) => void;
}

export default function AddOptionsField({ values, handleChange, correct }: Props) {
    const { t } = useTranslation();
    const [option, setOption] = useState<string>("");

    const handleAdd = () => {
        if (!option?.trim())
            return;

        if (values.includes(option))
            return;

        const updated = [...values, option];

        handleChange("options", updated);

        setOption("");
    }

    const handleCorrect = (value: string) => {
        if (Array.isArray(correct)) {
            const updated = correct.includes(value)
                ? correct.filter(c => c !== value)
                : [...correct, value];

            handleChange("correct", updated);
        } else {
            handleChange("correct", value)
        }
    }

    const handleDelete = (value: string) => {
        const updated = values.filter(v => v !== value);
        handleChange("options", updated);

        if (Array.isArray(correct) && correct.includes(value))
            handleChange("correct", correct.filter(c => c !== value));
        else if (correct === value)
            handleChange("correct", '');
    }

    const isCorrect = (value: string) => {
        if (Array.isArray(correct))
            return correct.includes(value)
    
        return correct === value;
    }

    return (
        <fieldset className={style.fieldSet}>
            <legend className={style.fieldLabel}>
                {t('create.profileInformation.questionOption')}
            </legend>
            <div className={style.optionsContainer}>
                <List
                    sx={{
                        padding: 0
                    }}
                >
                    {values.map((value, index) => (
                        <ListItem
                            key={index}
                            className={style.listItemCard}
                        >
                            <ListItemText primary={value} />
                            <Button
                                variant="outlined"
                                onClick={() => handleCorrect(value)}
                            >
                                {isCorrect(value) ? (
                                    <>
                                         <CheckOutlined />
                                         {t('create.profileInformation.correctAnswer')}
                                    </>
                                ) : (
                                    <>
                                        {t('create.profileInformation.markCorrect')}
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outlined"
                                aria-label={t('create.buttons.delete')}
                                onClick={() => handleDelete(value)}
                            >
                                <DeleteOutlinedIcon />
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <div className={style.addOptionsInput}>
                    <TextField
                        fullWidth
                        value={option}
                        onChange={e => setOption(e.target.value)}
                        placeholder={t('create.profileInformation.questionOptionPlaceHolder')}
                    />
                    <Button
                        variant="outlined"
                        onClick={handleAdd}
                        disabled={!option?.trim() || values.includes(option)}
                    >
                        {t('create.buttons.add')}
                    </Button>
                </div>
            </div>
        </fieldset>
    )
}
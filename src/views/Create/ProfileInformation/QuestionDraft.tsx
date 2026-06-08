import SelectField from "@genaipg/components/FormFields/SelectField";
import TextArea from "@genaipg/components/FormFields/TextArea";
import { useTranslation } from "react-i18next";
import { Category, QuestionData, QuestionType } from "@genaipg/components/Question/types";
import { TextField, Typography } from "@mui/material";
import { Button } from "@genai-fi/base";
import Add from '@mui/icons-material/Add';
import Clear from '@mui/icons-material/Clear';
import AddOptionsField from "./AddOptionsField";
import style from './style.module.css';
import { addQuestionAtom, updateQuestionAtom } from "@genaipg/state/createState";
import { useSetAtom } from "jotai";

interface Props {
    category: Category;
    draft: Partial<QuestionData | undefined>;
    handleChanges: (key: string, field: string, value: string | string[] | number) => void;
    onSubmit: () => void;
    editing: number | null;
}

// TODO: This should probably be changed into switch case. Just like Templates, Questions etc..

export default function QuestionDraft({ category, draft, handleChanges, onSubmit, editing }: Props) {
    const { t } = useTranslation();
    const questionTypeOptions = t(
        'create.profileInformation.questionTypeOptions',
        { returnObjects: true }
    ) as Record<QuestionType, string>;
    const addQuestion = useSetAtom(addQuestionAtom);
    const updateQuestion = useSetAtom(updateQuestionAtom);

    const handleSubmit = () => {
        if (editing) {
            updateQuestion({
                categoryId: category.id,
                questionId: editing,
                updates: draft as QuestionData
            })

        } else {
            addQuestion({
                categoryId: category.id,
                question: draft as QuestionData
            })
        }

        onSubmit();
    }

    const handleDraftChange = (field: string, value: string | string[] | number) => {
        handleChanges(category.category, field, value);
    }

    const validate = () => {
        if (!draft?.text?.trim()) return false;
        if (!draft?.type) return false;

        switch (draft.type) {
            case 'multichoice':
            case 'singlechoice':
                if ((draft.options?.length ?? 0) < 2) return false;

                if (Array.isArray(draft.correct))
                    return draft.correct.length > 0;

                return draft?.correct;
            case 'slider':
                return draft?.correct
            default:
                return true;
        }
    }

    return (
        <div className={style.draftContainer}>
            <TextArea
                title={t('create.profileInformation.questionText')}
                placeholder={t('create.profileInformation.questionTextPlaceholder')}
                onChange={(value) => handleChanges(category.category, "text", value)}
                value={draft?.text || ''}
            />

            <SelectField
                label={t('create.profileInformation.questionType')}
                value={draft?.type ? questionTypeOptions[draft.type] : ''}
                options={Object.values(questionTypeOptions)}
                onChange={(selectedLabel) => {
                    const selectedKey = (Object.keys(questionTypeOptions) as QuestionType[])
                        .find((key) => questionTypeOptions[key] === selectedLabel);

                    if (selectedKey) {
                        handleChanges(category.category, "type", selectedKey);
                    }
                }}
                placeholder={t('create.profileInformation.questionTypePlaceholder')}
            />
            {draft?.type === 'slider' &&
                <div>
                    <Typography className={style.fieldLabel}>
                        {t('create.profileInformation.configSlider')}
                    </Typography>

                    <Typography className={style.fieldSubLabel}>
                        {t('create.profileInformation.configSliderDescription')}
                    </Typography>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <fieldset className={style.fieldSet} style={{ flex: 1 }}>
                            <legend>
                                {t('create.profileInformation.min')}
                            </legend>
                            <TextField
                                fullWidth
                                type="number"
                                placeholder='0'
                                value={draft?.min ?? ''}
                                onChange={e => handleChanges(category.category, 'min', e.target.value)}
                            />
                        </fieldset>

                        <fieldset className={style.fieldSet} style={{ flex: 1 }}>
                            <legend>
                                {t('create.profileInformation.max')}
                            </legend>
                            <TextField
                                fullWidth
                                type="number"
                                placeholder='100'
                                value={draft?.max ?? ''}
                                onChange={e => handleChanges(category.category, 'max', e.target.value)}
                            />
                        </fieldset>
                    </div>

                    <div style={{ marginTop: 16, maxWidth: 200 }}>
                        <fieldset className={style.fieldSet}>
                            <legend className={style.fieldSubLabel}>
                                {t("create.profileInformation.chooseCorrect")}
                            </legend>
                            <TextField
                                fullWidth
                                type="number"
                                placeholder={t('create.profileInformation.questionSliderPlaceHolder')}
                                value={draft?.correct ?? ''}
                                onChange={e => handleChanges(category.category, 'correct', e.target.value)}
                            />
                        </fieldset>
                    </div>
                </div>
            }
            {draft?.type === 'multichoice' &&
                <AddOptionsField
                    values={draft?.options || []}
                    correct={draft?.correct || []}
                    handleChange={handleDraftChange}
                />
            }
            {draft?.type === 'singlechoice' &&
                <AddOptionsField
                    values={draft?.options || []}
                    correct={draft?.correct || ''}
                    handleChange={handleDraftChange}
                />
            }
            <div className={style.buttonContainer}>
                <Button
                    startIcon={<Clear/>}
                    variant="outlined"
                    onClick={onSubmit}
                >
                    {t('create.buttons.cancel')}
                </Button>
                <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!validate()}
                >
                    {editing ? t('create.profileInformation.updateQuestion') : t('create.profileInformation.addQuestion')}
                </Button>
            </div>
        </div>
    );
}
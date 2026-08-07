import { deleteCategory, questionsAtom, updateCategoryAtom } from "@genaipg/state/createState";
import { useAtom, useSetAtom } from "jotai";
import style from './style.module.css'
import AccordionSection from "@genaipg/components/Accordion/Accordion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { Button } from "@genai-fi/base";
import Add from '@mui/icons-material/Add';
import { Category, QuestionData } from "@genaipg/components/Question/types";
import QuestionDraft from "./QuestionDraft";
import MysteryProfileIcon from "@genaipg/components/Icons/MysteryProfileIcon";
import { QuestionsList } from "./QuestionsList";
import IconPicker from "@genaipg/components/FormFields/IconPicker";
import { IconType } from "@genaipg/components/Icons/type";

export function ProfileInformation() {
    const handleCategoryDelete = useSetAtom(deleteCategory);
    const updateCategory = useSetAtom(updateCategoryAtom);
    const [categories, setCategories] = useAtom(questionsAtom);
    const [drafts, setDrafts] = useState<Record<string, Partial<QuestionData>>>({});
    const [addingCategory, setAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [editingQuestion, setEditingQuestion] = useState<number | null>(null)
    const { t } = useTranslation();

    const handleDraftChange = (key: string, field: string, value: string | string[] | number) => {
        setDrafts(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (key: string) => {
        setDrafts(prev => ({ ...prev, [key]: {} }));
        setEditingQuestion(null);
    };

    const handleEdit = (category: string, question: QuestionData) => {
        setEditingQuestion(question.id);
        setDrafts(prev => ({
            ...prev,
            [category]: question,
        }))
    }

    const updateCategoryIcon = (categoryId: number, icon: IconType ) => {
        updateCategory({
            categoryId,
            updates: {
                icon
            },
        })
    }

    const addNewCategory = () => {
        const name = newCategoryName?.trim();
        if (!name) return;

        const isDuplicate = categories.some(
            c => c.category.toLowerCase() === name.toLowerCase()
        );

        if (isDuplicate) return;

        const newCat: Category = { id: categories.length + 1, category: name, questions: [], icon: 'default' }
        setCategories(prev => [...prev, newCat]);
        setAddingCategory(false);
        setNewCategoryName('');
    }

    return (
        <div className={style.container}>
            <div className={style.questionForm}>
                <div className={style.header}>
                    <span className={style.icon}>
                        <MysteryProfileIcon />
                    </span>
                    <div className={style.profileInformation}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{t('create.profileInformation.title')}</Typography>
                        <Typography variant="body1">{t('create.profileInformation.description')}</Typography>
                    </div>
                </div>
                <Typography variant="h6" sx={{ fontWeight: 'normal', color: '#444' }}>  Profile information </Typography>
                {categories.map((cat) => (
                    <AccordionSection key={cat.id} label={cat.category} onDelete={() => handleCategoryDelete({ category: cat.category })}>
                        <IconPicker 
                            label={t("create.profileInformation.iconLabel")} 
                            icon={cat.icon}
                            updateIcon={(icon) => updateCategoryIcon(cat.id, icon)}
                        />
                        <div className={style.questionsContainer}>
                            <h4>{t('create.profileInformation.questions')}</h4>
                            {cat.questions.length > 0 ? (
                                <QuestionsList category={cat} handleEdit={handleEdit} />
                            ) : (
                                <Typography
                                    sx={{
                                        fontStyle: 'italic',
                                        padding: '1rem'
                                    }}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {t('create.profileInformation.noQuestions')}
                                </Typography>
                            )}
                        </div>
                        <QuestionDraft
                            category={cat}
                            editing={editingQuestion}
                            draft={drafts[cat.category] ?? {}}
                            handleChanges={handleDraftChange}
                            onSubmit={() => handleSubmit(cat.category)}
                        />
                    </AccordionSection>
                ))}

                <div className={style.addCatContainer}>
                    {addingCategory ? (
                        <div className={style.addCatArea}>
                            <TextField
                                fullWidth
                                className={style.addCatInput}
                                placeholder={t('create.profileInformation.categoryPlaceholder')}
                                onChange={e => setNewCategoryName(e.target.value)}
                                value={newCategoryName && newCategoryName.trim()}
                            />
                            <Button
                                variant="outlined"
                                onClick={addNewCategory}
                                disabled={!newCategoryName}
                            >
                                {t("create.buttons.add")}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setAddingCategory(false);
                                    setNewCategoryName("");
                                }}
                            >
                                {t("create.buttons.cancel")}
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className={style.addCatArea}
                            startIcon={<Add />}
                            sx={{ width: '100%' }}
                            onClick={() => setAddingCategory(true)}
                        >
                            {t('create.profileInformation.addCategory')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
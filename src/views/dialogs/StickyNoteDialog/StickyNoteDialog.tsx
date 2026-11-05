import { Button } from "@genai-fi/base";
import CheckBoxField from "@genaipg/components/FormFields/CheckboxField";
import { getAllOpenEndedQuestionsAtom, hasOpenEndedQuestionsAtom, selectedStickyNoteQuestionsAtom } from "@genaipg/state/createState";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import style from './style.module.css';

export default function StickyNoteDialog() {
    const { t } = useTranslation();
    const hasOpenEndedQuestions = useAtomValue(hasOpenEndedQuestionsAtom);
    const openEndedQuestions = useAtomValue(getAllOpenEndedQuestionsAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useAtom(selectedStickyNoteQuestionsAtom);

    const doClose = () => {
        setIsOpen(false);
    };

    const toggleQuestion = (categoryId: string, questionId: string, checked: boolean) => {
        setSelectedQuestions(prev => {
            if (checked) {
                if (
                    prev.some(
                        item =>
                            item.categoryId === categoryId &&
                            item.questionId === questionId
                    )
                ) {
                    return prev;
                }

                return [...prev, { categoryId, questionId }];
            }

            return prev.filter(
                item =>
                    item.categoryId !== categoryId ||
                    item.questionId !== questionId
            );
        });
    };


    return (
        <>
            <Button
                variant='outlined'
                startIcon={<StickyNote2Icon />}
                onClick={() => setIsOpen(true)}
                disabled={!hasOpenEndedQuestions}
            >
                {t('create.buttons.addStickyNote')}
            </Button>

            <Dialog
                open={isOpen}
                onClose={doClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {t("create.clues.clue")}
                </DialogTitle>
                <DialogContent className={style.dialogContent}>
                    <div className={style.header}>
                        <span className={style.badge}>
                            <StickyNote2Icon fontSize="inherit"/>
                        </span>
                        <div>
                            <Typography variant="h5" fontWeight="bold">
                                {t("create.clues.stickyNotes.title")}
                            </Typography>
                            <Typography variant="subtitle2">
                                {t("create.clues.stickyNotes.subtitle")}
                            </Typography>
                        </div>
                    </div>
                    <div className={style.content}>
                        {openEndedQuestions.map((question, ix) => (
                            <div className={`${style.field} ${ix !== openEndedQuestions.length - 1 ? style.seperator : ''}`}>
                                <CheckBoxField
                                    key={ix}
                                    label={question.text}
                                    checked={selectedQuestions.some((value) => value.categoryId === question.categoryId && value.questionId === question.id)}
                                    text={t("create.clues.stickyNotes.choose")}
                                    onChange={(checked) => toggleQuestion(question.categoryId, question.id, checked)}
                                    normal={true}
                                    fontSize="18px"
                                />
                            </div>
                        ))}
                    </div>

                </DialogContent>
                <DialogActions className={style.dialogActions}>
                    <Button
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                    >
                        {t("game.ending.close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}       
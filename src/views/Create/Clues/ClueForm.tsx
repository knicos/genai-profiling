import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import style from "./style.module.css";
import TextArea from "@genaipg/components/FormFields/TextArea";
import MultiChoice from "@genaipg/components/FormFields/MultiChoice";
import { ClueData } from "../types";
import { useAtomValue } from "jotai";
import { questionCategoriesAtom } from "@genaipg/state/createState";
import { useTranslation } from "react-i18next";
import Visuals from "@genaipg/components/Slide/Visuals";
import useWorkFlowItems from "@genaipg/hooks/useWorkFlowItems";
import ImageIcon from '@mui/icons-material/Image';
import { Button } from "@genai-fi/base";
import { useState } from "react";
import InputVisualDialog from "@genaipg/views/dialogs/InputVisualDialog/InputVisualDialog";
import { Typography } from "@mui/material";


interface Props {
    data: ClueData;
    onChange: (data: Partial<ClueData>) => void;
}

export function ClueForm({ data, onChange }: Props) {
    const { usedCategories } = useWorkFlowItems();
    const { t } = useTranslation();
    const categories = useAtomValue(questionCategoriesAtom);
    const [draft, setDraft] = useState<ClueData>(data)

    const validateDraft = () => {
        return draft.visual !== undefined && draft.clue.trim() !== '' && draft.category.length > 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onChange(draft);
    }

    return (
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={style.formContainer}>
                <div
                    className={style.formSection}
                    style={{ maxWidth: '225px' }}
                >
                    <legend className={style.fieldLabel}>
                        <span aria-hidden="true">* </span>
                        {t('create.clues.imageInstructions')}
                    </legend>
                    <div
                        className={style.phoneFrame}
                    >
                        <PhoneFrame>
                            {draft.visual ? (
                                <Visuals visual={draft.visual} />
                            ) : (
                                <div className={style.uploadImage}>
                                    <ImageIcon style={{ fontSize: '8rem' }}/>
                                    <Typography variant="h6" style={{ textAlign: 'center', margin: '0 7px' }}>{t("create.clues.noImageYet")}</Typography>
                                </div>
                            )}
                        </PhoneFrame>
                    </div>
                    <InputVisualDialog
                        onSave={(visual) =>
                            setDraft(prev => ({
                                ...prev,
                                visual
                            }))
                        }
                    />
                </div>
                <div
                    className={style.formSection}
                    style={{ maxWidth: '450px' }}
                >
                    <TextArea
                        title={t('create.clues.describeClue')}
                        placeholder={t('create.clues.describeCluePlaceholder')}
                        value={draft.clue}
                        onChange={(clue) => setDraft(prev => ({ ...prev, clue }))}
                        required={true}
                        subtitle={t('create.clues.describeClueSubtitle')}
                        multiline
                        rows={4}
                    />
                    <MultiChoice
                        label={t('create.clues.categoryQuestion')}
                        options={categories}
                        value={draft.category}
                        onChange={(category) => setDraft(prev => ({ ...prev, category }))}
                        markedOptions={usedCategories}
                        required={true}
                        sublabel={t('create.clues.categoryQuestionSubtitle')}
                    />
                </div>
            </div>
            <div className={style.formButtons}>
                <Button
                    variant="outlined"
                    onClick={() => setDraft(data)}
                    sx={{ borderColor: 'var(--secondary)', color: 'var(--secondary)', background: 'white' }}
                >
                    {t("create.buttons.cancel")}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ background: 'var(--secondary)' }}
                    disabled={!validateDraft()}
                >
                    {t("create.buttons.save")}
                </Button>
            </div>
        </form>
    );
}
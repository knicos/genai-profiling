import TextArea from "@genaipg/components/FormFields/TextArea";
import { FormField } from "./types";
import { TemplateData, TemplateType, TemplateMemoryMap } from "@genaipg/components/Templates/types";
import { useTranslation } from "react-i18next";
import CheckBoxField from "@genaipg/components/FormFields/CheckboxField";
import ImageField from "@genaipg/components/FormFields/ImageField";
import style from './style.module.css';
import { IconButton } from "@genaipg/components/Button/IconButton";
import { List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FONT_SIZE } from "@genaipg/style/typography";

interface Props {
    field: FormField;
    template: TemplateType;
    isEnabled?: (field: FormField, values: TemplateData) => boolean;
    handleAddMemory: (url: string) => void;
    getValue: (field: FormField, ix: number) => string;
    handleChange: (label: string, value: string, ix?: number) => void;
    values: TemplateData;
    ix: number;
    draft: TemplateData;
    setDraft: (draft: TemplateData) => void;
    checked?: boolean; 
}

export default function FormFields({ field, template, isEnabled, getValue, handleChange, values, ix, draft, setDraft, handleAddMemory, checked }: Props) {
    const { t } = useTranslation();

    switch (field.type) {
        case 'text':
            return (
                <TextArea
                    title={t(`create.clues.templates.${template}.${field.label}`)}
                    placeholder={t(`create.clues.templates.${template}.${field.label}Placeholder`)}
                    value={getValue(field, ix)}
                    onChange={(value) => handleChange(field.label, value, ix)}
                    inputProps={{ maxLength: field.maxLength }}
                    disabled={isEnabled && !isEnabled(field, values)}
                    multiline={field.multiline}
                    minRows={field.multiline ? 2 : 'none'}
                    fullWidth
                    required={field.required}
                    fontSize={FONT_SIZE.medium}
                    normal={true}

                />
            );
        case 'check':
            return (
                <CheckBoxField
                    onChange={(value) => setDraft({
                        ...draft,
                        checked: value
                    } as TemplateData)}
                    text={t(`create.clues.templates.${template}.${field.label}.text`)}
                    label={t(`create.clues.templates.${template}.${field.label}`)}
                    fontSize={FONT_SIZE.medium}
                    required={field.required}
                    normal={true}
                    checked={checked}
                />
            );
        case 'image':
            return (
                <ImageField
                    label={t(`create.clues.templates.${template}.${field.label}`)}
                    text={t('create.clues.imageButton')}
                    onChange={(value) => handleChange(field.label, value)}
                    fontSize={FONT_SIZE.medium}
                    required={field.required}
                    normal={true}
                />
            );
        case 'memoryMap':
            return (
                <div className={style.listFieldWrapper}>
                    <ImageField
                        label={t(`create.clues.templates.${template}.${field.label}`)}
                        text={t(`create.clues.templates.${template}.addMemory`)}
                        onChange={(value) => handleAddMemory(value)}
                        fontSize={FONT_SIZE.medium}
                        required={field.required}
                        normal={true}
                    />
                    <List
                        className={style.listField}
                        subheader={t(`create.clues.templates.${template}.memoriesList`)}
                    >
                        {draft.type === 'memoryMap' && draft.memories?.map((_, index) => (
                            <ListItem
                                key={index}
                                className={style.listItem}
                                secondaryAction={
                                    <IconButton
                                        onClick={() => {
                                            const current = (draft as TemplateMemoryMap).memories ?? [];
                                            const updated = current.filter((_, i) => i !== index);
                                            setDraft({ ...draft, memories: updated } as TemplateData);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                {t("create.clues.templates.memoryMap.memory")} {index + 1}
                            </ListItem>
                        ))}
                    </List>
                </div>
            );
    }
}
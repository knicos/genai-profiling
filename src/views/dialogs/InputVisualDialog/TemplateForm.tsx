import { useTranslation } from "react-i18next";
import { ContentTemplate } from "./ContentTemplate";
import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import { TemplateData, TemplateSearches, TemplateStreaming, TemplateType } from "@genaipg/components/Templates/types";
import { Templates } from "./templates";
import Template from "@genaipg/components/Templates/Template";
import TextArea from "@genaipg/components/FormFields/TextArea";
import ImageField from "@genaipg/components/FormFields/ImageField";
import style from './style.module.css';
import { FormField } from "./types";

interface Props {
    draft: TemplateData;
    setDraft: (data: TemplateData) => void;
    template: TemplateType;
}

// TODO: Make more dynamic. The logic is now down, but needs to be refactored later. Only serves the available templates...

export default function TemplateForm({ draft, setDraft, template }: Props) {
    const { t } = useTranslation();
    const templateConfig = Templates[template];

    const getValue = (field: FormField, ix: number) => {
        if (field.label === 'searches') {
            return (draft as TemplateSearches).searches?.[ix] ?? '';
        }

        const value = (draft as TemplateStreaming)[field.label as keyof TemplateStreaming];

        return typeof value === 'string' ? value : '';
    };

    const handleChange = (key: string, value: string, index?: number) => {
        if (key === 'searches' && index !== undefined) {
            const current = (draft as TemplateSearches).searches ?? [];
            const updated = [...current];
            updated[index] = value;

            setDraft({
                ...draft,
                searches: updated
            } as TemplateData);

            return;
        }

        setDraft({
            ...draft,
            [key]: value
        } as TemplateData);
    };

    return (
        <ContentTemplate
            label={t("create.clues.fillTemplate")}
            subtitle={t("create.clues.fillTemplateSubtitle")}
            step={3}
        >
            <div className={style.formContainer}>
                <div className={style.phoneFrame}>
                    <PhoneFrame>
                        <Template template={draft} />
                    </PhoneFrame>
                </div>

                <div className={style.formFields}>
                    {templateConfig.fields.map((field, ix) => (
                        <div key={ix}>
                            {field.type === 'text' &&
                                <TextArea
                                    title={t(`create.clues.templates.${template}.${field.label}`)}
                                    placeholder={t(`create.clues.templates.${template}.${field.label}Placeholder`)}
                                    value={getValue(field, ix)}
                                    onChange={(value) => handleChange(field.label, value, ix)}
                                    inputProps={{ maxLength: 40 }}
                                />
                            }
                            {field.type === 'image' &&
                                <ImageField
                                    label={t(`create.clues.templates.${template}.${field.label}`)}
                                    text={t('create.clues.imageButton')}
                                    onChange={(value) => handleChange(field.label, value)}
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </ContentTemplate>
    );
}
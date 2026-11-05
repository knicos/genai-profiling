import { useTranslation } from "react-i18next";
import { ContentTemplate } from "./ContentTemplate";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import { Templates } from "./templates";
import { TemplateRadioButton } from "@genaipg/components/RadioButton/RadioButton";
import { TemplateType } from "@genaipg/components/Templates/types";
import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import Template from "@genaipg/components/Templates/Template";
import style from './style.module.css'
import HideImageIcon from '@mui/icons-material/HideImage';

interface Props {
    template: TemplateType | null;
    onChange: (value: TemplateType) => void;
}

export default function TemplatePicker({ template, onChange }: Props) {
    const { t } = useTranslation();

    return (
        <ContentTemplate
            label={t('create.clues.chooseTemplate')}
            subtitle={t('create.clues.chooseTemplateSubtitle')}
            step={2}
        >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', overflow: 'hidden' }}>
                <FormControl
                    style={{
                        overflowY: 'auto',
                        maxHeight: '600px',
                        scrollbarWidth: 'none'
                    }}
                >
                    <RadioGroup
                        value={template ?? ''}
                        onChange={(_, value) => onChange(value as TemplateType)}
                        sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                        {Object.entries(Templates).map(([group, templates]) => (
                            <div
                                key={group}
                                role="group"
                                className={style.templateGroup}
                                style={{
                                    borderTop: group === 'observedData' ? '1px solid var(--border-grey)' : undefined,
                                }}
                            >
                                <div>
                                    <h3>
                                        {t(`create.clues.templateGroups.${group}.label`)}
                                    </h3>

                                    <p>
                                        {t(`create.clues.templateGroups.${group}.description`)}
                                    </p>
                                </div>
                                <div className={style.templateGroupItems}>
                                    {Object.entries(templates).map(([key, value]) => (
                                        <TemplateRadioButton
                                            key={key}
                                            value={key}
                                            control={<Radio />}
                                            label={
                                                <>
                                                    <span
                                                        className={style.templateIcon}
                                                        style={{
                                                            background: value.color,
                                                        }}
                                                    >
                                                        <value.icon fontSize="inherit" />
                                                    </span>
                                                    <div className={style.templateLabel}>
                                                        {t(`create.clues.templates.${key}.label`)}
                                                    </div>
                                                </>
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
                <div className={style.phoneFrameWrapper}>
                    <h3>{t('create.clues.templatePreview')}</h3>
                    <div className={style.phoneFrame}>
                        <PhoneFrame>
                            {template ? (
                                <Template
                                    template={{
                                        type: template,
                                    }}
                                />
                            ) : (
                                <div className={style.noImage}>
                                    <HideImageIcon fontSize="inherit" />
                                </div>
                            )}
                        </PhoneFrame>
                    </div>
                    <p>{template ? t(`create.clues.templates.${template}.label`) : t('create.clues.noTemplateSelected')}</p>
                </div>
            </div>
        </ContentTemplate>
    );
}
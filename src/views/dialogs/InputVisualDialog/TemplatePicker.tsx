import { useTranslation } from "react-i18next";
import { ContentTemplate } from "./ContentTemplate";
import { Radio, RadioGroup } from "@mui/material";
import { Templates } from "./templates";
import { TemplateRadioButton } from "@genaipg/components/RadioButton/RadioButton";
import { TemplateType } from "@genaipg/components/Templates/types";

interface Props {
    template: TemplateType | null;
    onChange: (value: TemplateType) => void;
}

export default function TemplatePicker({ template, onChange }: Props) {
    const { t } = useTranslation()

    return (
        <ContentTemplate
            label={t('create.clues.chooseTemplate')}
            subtitle={t('create.clues.chooseTemplateSubtitle')}
            step={2}
        >
            <RadioGroup sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {(Object.entries(Templates) as [TemplateType, typeof Templates[TemplateType]][]).map(
                    ([key, value]) => (
                        <TemplateRadioButton
                            key={key}
                            value={key}
                            checked={key === template}
                            control={<Radio />}
                            label={
                                <>
                                    <div
                                        style={{
                                            background: value.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '2rem',
                                        }}
                                    >
                                        <value.icon />
                                    </div>

                                    <div
                                        style={{
                                            padding: '8px',
                                            textAlign: 'center',
                                            fontSize: '13px',
                                            borderTop: '1px solid rgba(0,0,0,0.08)',
                                        }}
                                    >
                                        {t(`create.clues.templates.${key}.label`)}
                                    </div>
                                </>
                            }
                            onChange={() => onChange(key)}
                        />
                    )
                )}
            </RadioGroup>
        </ContentTemplate>
    )
}
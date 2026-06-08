import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button } from "@genaipg/components/Button/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SourcePicker from "./SourcePicker";
import style from './style.module.css';
import { Source, Step } from "./types";
import { TemplateData, TemplateType } from "@genaipg/components/Templates/types";
import TemplatePicker from "./TemplatePicker";
import TemplateForm from "./TemplateForm";
import UploadImage from "./UploadImage";
import { SlideImage } from "@genaipg/components/Slide/types";
import { isFormValid } from "./validation";
import { ClueData } from "@genaipg/views/Create/types";

interface Props {
    onSave: (data: ClueData["visual"]) => void;
}

export default function InputVisualDialog({ onSave }: Props) {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>('source');
    const [source, setSource] = useState<Source | null>(null);
    const [template, setTemplate] = useState<TemplateType | null>(null);
    const [draft, setDraft] = useState<TemplateData | SlideImage | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const isFinalStep = step === 'form' || step === 'upload';

    const canProgress =
        step === 'source' ? !!source :
        step === 'template' ? !!template :
        step === 'form' ? isFormValid(draft as TemplateData, template as TemplateType):
        draft !== null;
        true;

    const doClose = () => {
        setIsOpen(false);
        setStep('source');
        setSource(null);
        setTemplate(null);
        setDraft(null);
    };

    const handleTemplateChange = (value: TemplateType) => {
        setTemplate(value);
        setDraft({ type: value } as TemplateData);
    };

    const handleNext = () => {
        if (step === 'source') {
            if (source === 'upload' || source === 'template') setStep(source);
        } else if (step === 'template' && template) {
            setStep('form');
        }
    };

    const handleBack = () => {
        if (step === 'template' || step === 'upload') {
            setStep('source');
            setDraft(null);
            setTemplate(null);
        } else if (step === 'form') {
            setStep('template');
            setDraft(template ? ({ type: template } as TemplateData) : null);
        }
    };

    const handleSave = () => {
        if (draft) onSave(draft)
        doClose();
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{ textTransform: 'none' }}
                onClick={() => setIsOpen(true)}
            >
                {t('create.clues.imageButton')}
            </Button>

            <Dialog open={isOpen} onClose={doClose}>
                <DialogTitle>{t('create.clues.createImage')}</DialogTitle>

                {step === 'source' && (
                    <SourcePicker source={source} onChange={setSource} />
                )}

                {step === 'template' && (
                    <TemplatePicker template={template} onChange={handleTemplateChange} />
                )}

                {step === 'upload' && (
                    <UploadImage
                        draft={draft as SlideImage}
                        setDraft={setDraft}
                    />
                )}

                {step === 'form' && template && draft && (
                    <TemplateForm
                        template={template}
                        draft={draft as TemplateData}
                        setDraft={setDraft}
                    />
                )}

                <DialogActions className={style.dialogActions}>
                    {step !== 'source' && (
                        <Button variant="outlined" onClick={handleBack}>
                            {t('create.buttons.previous')}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        disabled={!canProgress}
                        onClick={isFinalStep ? handleSave : handleNext}
                    >
                        {isFinalStep ? t('create.buttons.save') : t('create.buttons.next')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
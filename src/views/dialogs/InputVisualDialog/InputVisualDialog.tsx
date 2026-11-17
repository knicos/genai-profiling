import { Dialog, DialogActions, DialogTitle, Paper, PaperProps } from "@mui/material";
import { Button } from "@genaipg/components/Button/Button";
import { forwardRef, useEffect, useState } from "react";
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
import { motion } from "framer-motion";

const MotionPaper = forwardRef<HTMLDivElement, PaperProps>(
    ({ style, ...props }, ref) => (
        <Paper
            component={motion.div}
            ref={ref}
            layout
            transition={{
                type: 'spring',
                duration: 0.3
            }}
            style={{
                ...style,
                background: 'white',
                boxShadow: '2px 2px 10px var(--dropShadow)'
            }}
            {...props}
        />
    )
);

interface Props {
    onSave: (data: ClueData["visual"]) => void;
    initialVisual?: TemplateData | SlideImage | undefined;
}

export default function InputVisualDialog({ onSave, initialVisual }: Props) {
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
                step === 'form' ? isFormValid(draft as TemplateData, template as TemplateType) :
                    draft !== null;
    true;

    useEffect(() => {
        if (initialVisual) {
            setDraft(initialVisual);
            if (initialVisual.type === 'image') {
                setSource('upload');
                setStep('upload');
            } else {
                setSource('template');
                setStep('form');
                setTemplate(initialVisual.type);
            }
        } else {
            setDraft(null);
            setTemplate(null);
        }
    }, [initialVisual])

    const doClose = () => {
        setIsOpen(false);
        setStep('source');
        setSource(null);
        setTemplate(null);
        setDraft(null);
    };


    const handleTemplateChange = (value: TemplateType) => {
        setTemplate(value);

        setDraft((current) => {
            if (current && current.type === value) {
                return current;
            }

            return { type: value } as TemplateData;
        });
    };


    const handleNext = () => {
        if (step === 'source') {
            if (source === 'upload') {
                setDraft((current) =>
                    current?.type === 'image' ? current : null
                );
                setStep('upload');
            } else if (source === 'template') {
                setStep('template');
            }
        } else if (step === 'template' && template) {
            setStep('form');

            setDraft((current) => {
                if (current && current.type === template) {
                    return current;
                }

                return { type: template } as TemplateData;
            });
        }
    };


    const handleBack = () => {
        if (step === 'template' || step === 'upload') {
            setStep('source');
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

            <Dialog
                open={isOpen}
                onClose={doClose}
                maxWidth={'lg'}
                PaperComponent={MotionPaper}
            >
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
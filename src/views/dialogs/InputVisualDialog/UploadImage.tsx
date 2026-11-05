import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import ImageField from "@genaipg/components/FormFields/ImageField";
import { SlideImage } from "@genaipg/components/Slide/types";
import Visuals from "@genaipg/components/Slide/Visuals";
import { useTranslation } from "react-i18next";
import { ContentTemplate } from "./ContentTemplate";
import style from './style.module.css';
import { FONT_SIZE } from "@genaipg/style/typography";

interface Props {
    draft: SlideImage | null;
    setDraft: (draft: SlideImage) => void;
}

export default function UploadImage({ draft, setDraft }: Props) {
    const { t } = useTranslation()

    const handleChange = (url: string) => {
        const next: SlideImage = {
            type: 'image',
            url,
        };
        setDraft(next);
    };

    return (
        <ContentTemplate
            label={t('create.clues.uploadImage')}
            subtitle={t('create.clues.uploadImageInstructions')}
            step={2}
        >
            <div className={style.formContainer}>
                <ImageField
                    label={t(`create.clues.templates.image.label`)}
                    text={t('create.clues.imageButton')}
                    onChange={(value) => handleChange(value)}
                    fontSize={FONT_SIZE.medium}
                    required={true}
                    normal={true}
                />
                <div className={style.phoneFrameWrapper}>
                    <h3>{t('create.clues.templatePreview')}</h3>
                    <div className={style.phoneFrame}>
                        <PhoneFrame>
                            <Visuals visual={draft || { type: 'image', url: '', label: '' }} />
                        </PhoneFrame>
                    </div>
                </div>
            </div>

        </ContentTemplate>
    )
}
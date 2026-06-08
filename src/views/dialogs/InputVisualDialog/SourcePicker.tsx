import { BigRadioButton } from "@genaipg/components/RadioButton/RadioButton";
import GridView from '@mui/icons-material/GridView';
import Upload from '@mui/icons-material/Upload';
import { RadioGroup, Radio } from "@mui/material";
import { useTranslation } from "react-i18next"
import { ContentTemplate } from "./ContentTemplate";
import { Source } from "./types";

interface Props {
    source: Source | null;
    onChange: (source: Source | null) => void;
}

export default function SourcePicker({ source, onChange }: Props) {
    const { t } = useTranslation();

    return (
        <ContentTemplate
            label={t('create.clues.addImage')}
            subtitle={t('create.clues.addImageSubtitle')}
            step={1}
        >
            <RadioGroup
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
            >
                <BigRadioButton
                    value="template"
                    checked={source === 'template'}
                    control={<Radio />}
                    label={
                        <>
                            <GridView fontSize="large" />
                            {t('create.clues.useTemplate')}
                        </>
                    }
                    onClick={() => onChange('template')}
                />
                <BigRadioButton
                    value="upload"
                    checked={source === 'upload'}
                    control={<Radio />}
                    label={
                        <>
                            <Upload fontSize="large" />
                            {t('create.clues.uploadImage')}
                        </>
                    }
                    onClick={() => onChange('upload')}
                />
            </RadioGroup>
        </ContentTemplate>
    )
}
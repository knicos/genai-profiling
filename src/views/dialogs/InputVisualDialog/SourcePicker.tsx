import { BigRadioButton } from "@genaipg/components/RadioButton/RadioButton";
import GridView from '@mui/icons-material/GridView';
import Upload from '@mui/icons-material/Upload';
import { RadioGroup, Radio } from "@mui/material";
import { useTranslation } from "react-i18next"
import { ContentTemplate } from "./ContentTemplate";
import { Source } from "./types";
import style from './style.module.css';

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
                name="source"
                value={source ?? ''}
                onChange={(_, value) => onChange(value as Source)}
                className={style.sourceGroup}
            >
                <BigRadioButton
                    value="template"
                    control={<Radio />}
                    label={
                        <>
                            <GridView fontSize="large" aria-hidden="true" />
                            {t('create.clues.useTemplate')}
                        </>
                    }
                />

                <BigRadioButton
                    value="upload"
                    control={<Radio />}
                    label={
                        <>
                            <Upload fontSize="large" aria-hidden="true" />
                            {t('create.clues.uploadImage')}
                        </>
                    }
                />
            </RadioGroup>
        </ContentTemplate>
    )
}
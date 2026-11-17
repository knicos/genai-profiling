import { useTranslation } from "react-i18next";
import { ContentTemplate } from "./ContentTemplate";
import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import { TemplateData, TemplateSearches, TemplateStreaming, TemplateType, TemplateMemoryMap, TemplateWatchHistory } from "@genaipg/components/Templates/types";
import { Templates } from "./templates";
import Template from "@genaipg/components/Templates/Template";
import TextArea from "@genaipg/components/FormFields/TextArea";
import ImageField from "@genaipg/components/FormFields/ImageField";
import style from './style.module.css';
import { FormField } from "./types";
import { List, ListItem } from "@mui/material";
import { IconButton } from "@genaipg/components/Button/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@genai-fi/base";
import { useState } from "react";
import FormFields from "./FormFields";
import { FONT_SIZE } from "@genaipg/style/typography";

interface Props {
    draft: TemplateData;
    setDraft: (data: TemplateData) => void;
    template: TemplateType;
}


export default function TemplateForm({ draft, setDraft, template }: Props) {
    const { t } = useTranslation();
    const templateConfig = Templates.volunteeredData[template] ?? Templates.observedData[template];
    const values: TemplateData = draft;
    const [videoDraft, setVideoDraft] = useState({ url: '', title: '', creator: '' });

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

        else if (key === 'memories' && index !== undefined) {
            const current = (draft as TemplateMemoryMap).memories ?? [];
            const updated = [...current];
            updated[index] = { ...updated[index], url: value };
            setDraft({ ...draft, memories: updated } as TemplateData);
            return;
        }

        setDraft({
            ...draft,
            [key]: value
        } as TemplateData);
    };

    const handleAddMemory = (value: string) => {
        const current = (draft as TemplateMemoryMap).memories ?? [];
        const count = current.length;

        const newMemory = {
            id: Date.now().toString(),
            url: value,
            x: 0.5 + (count % 3) * 0.08 - 0.08,
            y: 0.4 + Math.floor(count / 3) * 0.1,
        }
        setDraft({ ...draft, memories: [...current, newMemory] } as TemplateData);
    };

    const handleAddVideo = () => {
        const current = (draft as TemplateWatchHistory).videos ?? [];

        const newVideo = {
            id: Date.now().toString(),
            url: videoDraft.url,
            title: videoDraft.title,
            creator: videoDraft.creator
        }
        setDraft({ ...draft, videos: [...current, newVideo] } as TemplateData);
        setVideoDraft({ url: '', creator: '', title: '' });
    }

    const isEnabled = (field: FormField, values: TemplateData) => {
        if (!field.enableIf) return true;

        const value = field.enableIf.field in values
            ? values[field.enableIf.field as keyof TemplateData]
            : undefined;

        return value === field.enableIf.equals;
    };

    return (
        <ContentTemplate
            label={t("create.clues.fillTemplate")}
            subtitle={t("create.clues.fillTemplateSubtitle")}
            step={3}
        >
            <div className={style.formContainer}>
                <div className={style.formFields}>
                    {templateConfig.fields.map((field, ix) => {
                        if (field.type === 'group' && field.fields) {
                            return (
                                <div key={ix} className={`${style.formField} ${ix !== templateConfig.fields.length - 1 ? style.seperator : ''}`}>
                                    {field.fields.map((subfield, subIx) => (
                                        <FormFields
                                            key={subIx}
                                            field={subfield}
                                            ix={subIx}
                                            template={template}
                                            isEnabled={isEnabled}
                                            getValue={getValue}
                                            handleChange={handleChange}
                                            handleAddMemory={handleAddMemory}
                                            values={values}
                                            draft={draft}
                                            setDraft={setDraft}
                                            checked={('checked' in draft && draft.checked)}
                                        />
                                    ))}
                                </div>
                            );
                        }

                        else if (field.type === 'video') {
                            return (
                                <div
                                    key={ix}
                                    className={style.videoFieldWrapper}
                                >
                                    <legend className={style.videoFieldLabel}>
                                        <span aria-hidden="true">* </span>
                                        {t(`create.clues.templates.${template}.${field.label}`)}
                                    </legend>
                                    <div className={style.listConfiguration}>
                                        <ImageField
                                            label={t(`create.clues.templates.${template}.addThumbnail`)}
                                            text={t('create.clues.imageButton')}
                                            onChange={(value) => setVideoDraft((prev) => ({ ...prev, url: value }))}
                                            fontSize={FONT_SIZE.medium}
                                            normal={true}
                                        />
                                        <TextArea
                                            title={t(`create.clues.templates.${template}.videoTitle`)}
                                            placeholder={t(`create.clues.templates.${template}.videoTitlePlaceholder`)}
                                            value={videoDraft.title}
                                            fullWidth
                                            multiline
                                            onChange={(value) => setVideoDraft((prev) => ({ ...prev, title: value }))}
                                            fontSize={FONT_SIZE.medium}
                                            normal={true}
                                            slotProps={{
                                                htmlInput: {
                                                    maxLength: 60
                                                }
                                            }}
                                        />
                                        <TextArea
                                            title={t(`create.clues.templates.${template}.videoCreator`)}
                                            placeholder={t(`create.clues.templates.${template}.videoCreatorPlaceholder`)}
                                            value={videoDraft.creator}
                                            fullWidth
                                            onChange={(value) => setVideoDraft((prev) => ({ ...prev, creator: value }))}
                                            fontSize={FONT_SIZE.medium}
                                            normal={true}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleAddVideo}
                                            disabled={!videoDraft.url}
                                        >
                                            {t(`create.clues.templates.${template}.addVideo`)}
                                        </Button>
                                        <List
                                            className={style.listField}
                                            subheader={t(`create.clues.templates.${template}.videosList`)}
                                        >
                                            {draft.type === 'watchHistory' && draft.videos?.map((video, index) => (
                                                <ListItem
                                                    key={video.id}
                                                    className={style.listItem}
                                                    secondaryAction={
                                                        <IconButton
                                                            onClick={() => {
                                                                const current = (draft as TemplateWatchHistory).videos ?? [];
                                                                const updated = current.filter((_, i) => i !== index);
                                                                setDraft({ ...draft, videos: updated } as TemplateData);
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                    <span>
                                                        {video.title}
                                                    </span>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </div>
                            );
                        }


                        return (
                            <div key={ix} className={`${style.formField} ${ix !== templateConfig.fields.length - 1 ? style.seperator : ''}`}>
                                <FormFields
                                    field={field}
                                    ix={ix}
                                    template={template}
                                    isEnabled={isEnabled}
                                    getValue={getValue}
                                    handleChange={handleChange}
                                    handleAddMemory={handleAddMemory}
                                    values={values}
                                    draft={draft}
                                    setDraft={setDraft}
                                    checked={('checked' in draft && draft.checked)}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className={style.phoneFrameWrapper}>
                    <h3>{t('create.clues.templatePreview')}</h3>
                    <div className={style.phoneFrame}>
                        <PhoneFrame>
                            <Template
                                template={draft}
                                editable={true}
                                onMemoriesChange={(memories) => {
                                    setDraft({
                                        ...(draft as TemplateMemoryMap),
                                        memories,
                                    });
                                }}
                            />
                        </PhoneFrame>
                    </div>
                </div>
            </div>
        </ContentTemplate>
    );
}
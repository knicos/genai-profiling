import { useMemo } from "react";
import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import GridOnOutlined from '@mui/icons-material/GridOnOutlined';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { useAtomValue, useSetAtom } from "jotai";
import { orderedCluesAtom, createFormOrder, editorItemsAtom, formOrderAtom } from "@genaipg/state/createState";
import Visuals from "@genaipg/components/Slide/Visuals";
import { SegmentedControl, SegmentedControlButton } from "@genaipg/components/SegmentedControl/SegmentedControl";
import { useEffect, useState } from "react";
import SlideShow from "@genaipg/components/SlideShow/SlideShow";
import { SlideMeta } from "@genaipg/components/Slide/types";
import StudentPreview from "./StudentPreview";
import style from './style.module.css'
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

export default function ConfirmationView() {
    const { t } = useTranslation();
    const clues = useAtomValue(orderedCluesAtom);
    const [preview, setPreview] = useState<boolean>(false);
    const [slidePages, setSlidePages] = useState<number>(0)
    const forms = useAtomValue(formOrderAtom);
    const setForms = useSetAtom(createFormOrder);
    const editorItems = useAtomValue(editorItemsAtom)

    const slides = useMemo(() => {
        return editorItems.flatMap((item): SlideMeta[] => {
            if (item.type === "checkpoint") {
                return [{ type: "checkpoint" }];
            }

            const clue = clues.find((clue) => clue.id === item.id);

            if (!clue) {
                return [];
            }

            return [{
                type: "demo",
                clue,
            }];
        });
    }, [editorItems, clues]);

    useEffect(() => {
        if (!forms?.forms)
            setForms({ level: 1 })
    }, [forms?.forms, setForms])

    return (
        <div className={style.outerContainer}>
            <StudentPreview formIndex={preview ? slidePages : undefined} />
            <div className={style.displayContainer}>
                <div className={style.topBar}>
                    <SegmentedControl>
                        <SegmentedControlButton
                            value="collage"
                            selected={!preview}
                            onClick={() => setPreview(false)}
                        >
                            <GridOnOutlined />
                            {t('create.confirmation.collage')}
                        </SegmentedControlButton>
                        <SegmentedControlButton
                            value="preview"
                            selected={preview}
                            onClick={() => setPreview(true)}
                        >
                            <RemoveRedEye />
                            {t('create.confirmation.preview')}
                        </SegmentedControlButton>
                    </SegmentedControl>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}>
                        <span className={style.fieldLabel}>
                            {t('create.confirmation.hardness.placeholder')}
                        </span>
                        <Select
                            value={forms?.level ?? 1}
                            onChange={(e) =>
                                setForms({ level: e.target.value as 1 | 2 | 3 })
                            }
                            sx={{ background: 'white', minWidth: '100px', maxHeight: '50px' }}
                        >
                            {[1, 2, 3].map((value) => (
                                <MenuItem key={value} value={value}>
                                    {t(`create.confirmation.hardness.${value}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                {preview ? (
                    <div className={style.slidesContainer}>
                        <SlideShow
                            index={slidePages}
                            slides={slides}
                            showControls
                            hasNext={slidePages < slides.length - 1}
                            onChange={(index: number) => {
                                if (index >= 0 && index < slides.length)
                                    setSlidePages(index);
                            }}
                        />
                    </div>
                ) : (
                    <div className={style.collageContainer}>
                        {clues.map((clue) => (
                            <div
                                key={clue.id}
                                style={{
                                    aspectRatio: '1 / 2',
                                    borderRadius: '18px',
                                    position: 'relative',
                                }}
                            >
                                {clue.visual ? (
                                    <Visuals visual={clue.visual} />
                                ) : (
                                    <PhoneFrame>
                                        <div className={style.noImageFrame}>
                                            <p style={{ color: '#666', fontSize: '12px' }}>
                                                {t("create.clues.templates.image.noImage")}
                                            </p>
                                        </div>
                                    </PhoneFrame>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
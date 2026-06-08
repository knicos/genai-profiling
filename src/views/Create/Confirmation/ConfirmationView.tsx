import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import GridOnOutlined from '@mui/icons-material/GridOnOutlined';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { useAtomValue } from "jotai";
import { cluesAtom, questionsAtom } from "@genaipg/state/createState";
import Visuals from "@genaipg/components/Slide/Visuals";
import { SegmentedControl, SegmentedControlButton } from "@genaipg/components/SegmentedControl/SegmentedControl";
import { useState } from "react";
import SlideShow from "@genaipg/components/SlideShow/SlideShow";
import { SlideMeta } from "@genaipg/components/Slide/types";
import StudentPreview from "./StudentPreview";
import style from './style.module.css'
import { useTranslation } from "react-i18next";

export default function ConfirmationView() {
    const { t } = useTranslation();
    const clues = useAtomValue(cluesAtom);
    const questions = useAtomValue(questionsAtom)
    const [preview, setPreview] = useState<boolean>(false);
    const slides = clues.map((clue) => ({
        type: 'demo',
        clue,
    })) as SlideMeta[];
    const [slidePages, setSlidePages] = useState<number>(0)
    const MAX_SLIDES_PER_SECTION = 4;
    const numSections = Math.ceil(slides.length / MAX_SLIDES_PER_SECTION);
    const questionsPerSection = Math.ceil(questions.length / numSections);
    const slidesPerSection = slides.length / numSections;

    const currentSection = Math.min(
        Math.floor(slidePages / slidesPerSection),
        numSections - 1
    );

    const visibleQuestions = preview
        ? questions.slice(0, (currentSection + 1) * questionsPerSection)
        : questions;


    return (
        <div className={style.outerContainer}>
            <StudentPreview categories={visibleQuestions} />
            <div className={style.displayContainer}>
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

                {preview ? (
                    <div className={style.slidesContainer}>
                        <SlideShow
                            index={slidePages}
                            slides={slides}
                            showControls
                            hasNext={slidePages < slides.length - 1}
                            onChange={(index: number) => {
                                if (index >= 0 && index < slides.length)
                                    setSlidePages(index)
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
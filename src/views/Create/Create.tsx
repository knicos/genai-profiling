import { Menu } from "./Menu";
import { BottomMenu } from "./BottomMenu";
import JSZip from "jszip";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtom, useAtomValue } from "jotai";
import { editorItemsAtom, cluesAtom, formOrderAtom, questionsAtom } from "@genaipg/state/createState";
import { buildInitialQuestions } from "@genaipg/util/buildInitialQuestions";
import style from './style.module.css';
import { SlideMeta } from "@genaipg/components/Slide/types";
import { REVEAL_PROFILE_FORM_ID, TIMELINE_FORM_ID } from "@genaipg/constants/formIds";
import { getImage } from "@genaipg/services/images/images";

export function Component() {
    const { t } = useTranslation()
    const [questions, setQuestions] = useAtom(questionsAtom);
    const clues = useAtomValue(cluesAtom)
    const forms = useAtomValue(formOrderAtom);
    const editorItems = useAtomValue(editorItemsAtom);

    useEffect(() => {
        if (questions.length <= 0)
            setQuestions(buildInitialQuestions(t))
    }, [t, setQuestions, questions.length]);

    const exportZip = async () => {
        const zip = new JSZip();
        const images = zip.folder("images");

        const slideData: SlideMeta[] = [];

        for (const item of editorItems) {
            let fileName;

            if (item.type === 'checkpoint') {
                slideData.push({
                    type: 'checkpoint',
                });
            } else if (item.type === 'clue') {
                const clue = clues.find(c => c.id === item.id);

                if (clue && clue.visual) {
                    if ("url" in clue.visual && clue.visual.url) { 
                        const imageUrl = getImage(clue.visual.url); 
                        if (imageUrl) { 
                            const blob = await (await fetch(imageUrl)).blob(); 
                            fileName = `clue-${clue.id}`; images?.file(`${fileName}.png`, blob); 
                        } 
                    }

                    slideData.push({
                        type: 'demo',
                        clue: {
                            ...clue,
                            visual: fileName && clue.visual && 'url' in clue.visual
                                ? { ...clue.visual, url: `${fileName}` }
                                : clue.visual,
                        }
                    });
                }
            }
        }

        const exportedForms = forms?.forms ? [...forms.forms] : [];


        if (exportedForms.length > 0) {
            const lastFormIndex = exportedForms.length - 1;

            for (let i = 0; i < exportedForms.length; i++) {
                if (i === lastFormIndex) {
                    slideData.push({
                        type: "collage",
                        form: i,
                        id: i,
                    });

                    continue;
                }

                if (slideData[i]) {
                    slideData[i].form = i;
                }
            }

            exportedForms.push(
                [REVEAL_PROFILE_FORM_ID],
                [TIMELINE_FORM_ID]
            );

            const revealProfileForm = exportedForms.length - 2;
            const timelineForm = exportedForms.length - 1;

            slideData.push({
                type: "ending",
                form: revealProfileForm,
                steps: [
                    {
                        id: "revealProfile",
                        form: revealProfileForm,
                    },
                    {
                        id: "timeline",
                        form: timelineForm,
                    },
                ],
            });
        }


        zip.file("slides.json", JSON.stringify(slideData, null, 2));
        zip.file("questions.json", JSON.stringify({ questions, forms: exportedForms }, null, 2));

        const blob = await zip.generateAsync({ type: "blob" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "mystery.zip";
        document.body.appendChild(a);
        a.click();

        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={style.container}>
            <Menu />
            <div className={style.contentContainer}>
                <Outlet />
            </div>
            <BottomMenu onExport={exportZip} />
        </div>
    );
}
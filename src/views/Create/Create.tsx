import { Menu } from "./Menu";
import { BottomMenu } from "./BottomMenu";
import JSZip from "jszip";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtom, useAtomValue } from "jotai";
import { cluesAtom, formOrderAtom, questionsAtom } from "@genaipg/state/createState";
import { buildInitialQuestions } from "@genaipg/util/buildInitialQuestions";
import style from './style.module.css';
import { SlideMeta } from "@genaipg/components/Slide/types";

export default function Create() {
    const { t } = useTranslation()
    const [questions, setQuestions] = useAtom(questionsAtom);
    const [clues,] = useAtom(cluesAtom)
    const forms = useAtomValue(formOrderAtom);

    useEffect(() => {
        setQuestions(buildInitialQuestions(t))
    }, [t, setQuestions])

    const exportZip = async () => {
        const zip = new JSZip();
        const images = zip.folder("images");

        const slideData: SlideMeta[] = [];

        for (const clue of clues) {
            let fileName;

            if (clue.visual) {
                if ('url' in clue.visual && clue.visual.url) {
                    const blob = await (await fetch(clue.visual.url)).blob();
                    fileName = `clue-${clue.id}`;
                    images?.file(`${fileName}.png`, blob);
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

        if (Array.isArray(forms?.forms)) {
            /*Before implementing the add your own breaks  */
            for (let i = 0; i < forms.forms.length; i++) {
                if (forms.forms[i]?.includes(100)) {
                    slideData.splice(i, 0, { type: 'checkpoint' })
                } 

                slideData[i].form = i;
            }
        }

        zip.file("slides.json", JSON.stringify(slideData, null, 2));
        zip.file("questions.json", JSON.stringify({ questions, forms: forms?.forms }, null, 2));

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
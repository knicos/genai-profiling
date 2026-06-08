import { Menu } from "./Menu";
import { BottomMenu } from "./BottomMenu";
import JSZip from "jszip";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { cluesAtom, questionsAtom } from "@genaipg/state/createState";
import { buildInitialQuestions } from "@genaipg/util/buildInitialQuestions";
import style from './style.module.css';
import { SlideDemo } from "@genaipg/components/Slide/types";

export default function Create() {
    const { t } = useTranslation()
    const [questions, setQuestions] = useAtom(questionsAtom);
    const [clues,] = useAtom(cluesAtom)

    useEffect(() => {
        setQuestions(buildInitialQuestions(t))
    }, [t, setQuestions])

    const exportZip = async () => {
        const zip = new JSZip();
        const images = zip.folder("images");

        const slideData: SlideDemo[] = [];

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
                    clue,
                    ...(clue.visual && 'url' in clue.visual && fileName && { url: `images/${fileName}.png` }),
                    label: clue.clue,
                    form: 0
                });
            }

        }

        zip.file("slides.json", JSON.stringify(slideData, null, 2));
        zip.file("questions.json", JSON.stringify(questions, null, 2));

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
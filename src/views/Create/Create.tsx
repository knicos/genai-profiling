import { Menu } from "./Menu";
import { BottomMenu } from "./BottomMenu";
import JSZip from "jszip";
import { Outlet } from 'react-router';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtom, useAtomValue } from "jotai";
import { editorItemsAtom, cluesAtom, formOrderAtom, questionsAtom, selectedStickyNoteQuestionsAtom } from "@genaipg/state/createState";
import { buildInitialQuestions } from "@genaipg/util/buildInitialQuestions";
import style from './style.module.css';
import { SlideMeta } from "@genaipg/components/Slide/types";
import { REVEAL_PROFILE_FORM_ID, STICKY_NOTE_FORM_ID, TIMELINE_FORM_ID } from "@genaipg/constants/formIds";
import { getImage } from "@genaipg/services/images/images";

export function Component() {
    const { t } = useTranslation()
    const [questions, setQuestions] = useAtom(questionsAtom);
    const clues = useAtomValue(cluesAtom)
    const forms = useAtomValue(formOrderAtom);
    const editorItems = useAtomValue(editorItemsAtom);
    const stickyBoard = useAtomValue(selectedStickyNoteQuestionsAtom);

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
            let profilePicName;
            let videos;
            let memories;

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
                            fileName = `clue-${clue.id}`;
                            images?.file(`${fileName}.png`, blob);
                        }
                    }

                    if ("profilePicUrl" in clue.visual && clue.visual.profilePicUrl) {
                        const imageUrl = getImage(clue.visual.profilePicUrl);
                        if (imageUrl) {
                            const blob = await (await fetch(imageUrl)).blob();
                            profilePicName = `profilePicUrl-${clue.id}`;
                            images?.file(`${profilePicName}.png`, blob);
                        }
                    }

                    if (clue.visual.type === 'watchHistory') {
                        videos = await Promise.all(
                            (clue.visual.videos ?? []).map(async (video, ix) => {
                                const imageUrl = getImage(video.url);
                                let videoName;

                                if (imageUrl) {
                                    const response = await fetch(imageUrl);

                                    if (!response.ok) {
                                        throw new Error(`Failed to fetch video image: ${response.status}`);
                                    }

                                    const blob = await response.blob();
                                    videoName = `video-${clue.id}-${ix}`;

                                    images?.file(`${videoName}.png`, blob);
                                }

                                return {
                                    ...video,
                                    url: videoName ?? video.url,
                                };
                            })
                        );
                    }

                    if (clue.visual.type === 'memoryMap') {
                        memories = await Promise.all(
                            (clue.visual.memories ?? []).map(async (memory, ix) => {
                                const imageUrl = getImage(memory.url);
                                let memoryName;

                                if (imageUrl) {
                                    const response = await fetch(imageUrl);

                                    if (!response.ok) {
                                        throw new Error(`Failed to fetch video image: ${response.status}`);
                                    }

                                    const blob = await response.blob();
                                    memoryName = `memory-${clue.id}-${ix}`;

                                    images?.file(`${memoryName}.png`, blob);
                                }

                                return {
                                    ...memory,
                                    url: memoryName ?? memory.url,
                                };
                            })
                        );
                    }

                    slideData.push({
                        type: "demo",
                        clue: {
                            ...clue,
                            visual: {
                                ...clue.visual,
                                ...(
                                    fileName
                                        ? { url: fileName }
                                        : {}
                                ),
                                ...(
                                    profilePicName
                                        ? { profilePicUrl: profilePicName }
                                        : {}
                                ),
                                ...(
                                    videos
                                        ? { videos: videos }
                                        : {}
                                ),
                                ...(
                                    memories
                                        ? { memories: memories }
                                        : {}
                                ),
                            },
                        },
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

                    if (stickyBoard.length > 0) {
                        slideData.push({
                            type: "board",
                            form: STICKY_NOTE_FORM_ID,
                            steps: stickyBoard
                        })

                        exportedForms.push([STICKY_NOTE_FORM_ID]);
                    }

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
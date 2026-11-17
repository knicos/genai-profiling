import { useTranslation } from "react-i18next";
import style from './style.module.css';
import { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { cluesAtom, editorItemsAtom, formOrderAtom, questionsAtom } from "@genaipg/state/createState";
import { loadZipFile, ZipData } from "@genai-fi/base";
import { useNavigate } from "react-router";
import { addImage } from "@genaipg/services/images/images";
import { Category } from "@genaipg/components/Question/types";
import { SlideMeta } from "@genaipg/components/Slide/types";
import { ClueData, EditorItem } from "./types";
import { INTERMISSION_FORM_ID } from "@genaipg/constants/formIds";
import { Button, styled } from "@mui/material";
import CreateProfileIcon from "@genaipg/components/Icons/CreateProfileIcon";
import EditProfileIcon from "@genaipg/components/Icons/EditProfileIcon";
import Loading from '@genaipg/components/Loading/Loading';
import { RESET } from "jotai/utils";

const StyledButton = styled(Button)({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    background: 'var(--paleBlue)',
    color: 'black',
    gap: '5px',
    padding: '10px',
    fontWeight: 'bold',
    boxShadow: '2px 2px 4px var(--dropShadow)',
    fontSize: '1rem',
    minWidth: '150px',
    textTransform: 'none',
    '& .MuiButton-startIcon': {
        margin: 0
    },
    '&:hover': {
        filter: 'brightness(1.02)',
        boxShadow: '2px 2px 6px var(--dropShadow);'
    }
});

export default function CreateStart() {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const setQuestions = useSetAtom(questionsAtom);
    const setClues = useSetAtom(cluesAtom);
    const setFormOrder = useSetAtom(formOrderAtom);
    const setEditorAtom = useSetAtom(editorItemsAtom);

    useEffect(() => {
        setClues(RESET);
        setFormOrder(RESET);
        setEditorAtom(RESET);
        setQuestions(RESET);
    }, [setClues, setEditorAtom, setFormOrder, setQuestions]);

    const handleProfileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setLoading(true);

        try {
            const data = await loadZipFile(file);

            await doLoad(data);

            navigate('/create/editor');
        } catch (error) {
            console.error('Failed to load profile:', error);
            setLoading(false);
        } finally {
            event.target.value = '';
        }
    };

    const doLoad = async (data: ZipData) => {
        if (data.images) {
            data.images.forEach((content, name) => {
                addImage(name, content);
            });
        }

        let forms: (number | string)[][] = [];

        if ("questions" in data) {
            const questionsData = data.questions as {
                questions: Category[];
                forms: (number | string)[][];
            };

            setQuestions(questionsData.questions);

            forms = questionsData.forms;

            setFormOrder({
                level: 1,
                forms,
            });
        }

        if ("slides" in data) {
            const slides = data.slides as SlideMeta[];

            const clues = slides
                .filter((v) => v.type === "demo")
                .map((v) => v.clue)
                .filter(Boolean);

            const editorItem: EditorItem[] = clues.map((clue) => ({
                type: "clue",
                id: clue.id,
            }));

            const checkpointIndexes = forms
                .map((form, index) =>
                    form.includes(INTERMISSION_FORM_ID) ? index : -1
                )
                .filter((index) => index !== -1);

            checkpointIndexes
                .sort((a, b) => b - a)
                .forEach((index) => {
                    editorItem.splice(index, 0, {
                        type: "checkpoint"
                    });
                });

            setEditorAtom(editorItem);
            setClues(clues as ClueData[]);
        }
    };

    return (
        <Loading loading={loading}>
            <div className={style.configureContainer}>
                <h1>{t("create.createOrEdit")}</h1>
                <div className={style.configureInnerCont}>
                    <h2>
                        {t("create.createOrEditSubtitle")}
                    </h2>
                    <div className={style.buttonGroup}>
                        <StyledButton
                            startIcon={
                                <span
                                    className={style.icon}
                                >
                                    <CreateProfileIcon />
                                </span>
                            }
                            onClick={() => navigate('/create/editor')}
                        >
                            {t("create.createNew")}
                        </StyledButton>
                        <input type="file" accept=".zip" ref={fileInputRef} style={{ display: 'none' }} onChange={handleProfileUpload} disabled={loading} />
                        <StyledButton
                            startIcon={
                                <span
                                    className={style.icon}
                                >
                                    <EditProfileIcon />
                                </span>
                            }
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                        >
                            {t("create.upload")}
                        </StyledButton>
                    </div>
                </div>
            </div>
        </Loading>
    )
}
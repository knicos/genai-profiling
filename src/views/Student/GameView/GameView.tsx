import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import Overview from "@genaipg/views/Student/GameView/OverView";
import { useCallback, useEffect, useState } from "react";
import QuestionView from "@genaipg/views/Student/GameView/QuestionView";
import { useAtomValue, useSetAtom } from "jotai";
import { formAtom } from "@genaipg/state/profileState";
import Intermission from "./Intermission";
import { Button } from "@genai-fi/base";
import { useTranslation } from "react-i18next";
import { updateResponseAtom } from "@genaipg/state/responseState";

interface Props {
    formIndex: number;
    onDone: (state: boolean) => void;
}

export default function Gameview({ formIndex, onDone }: Props) {
    const { t } = useTranslation();
    const updateResponse = useSetAtom(updateResponseAtom)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [done, setDone] = useState(false);
    const form = useAtomValue(formAtom);

    useEffect(() => {
        setDone(false);
    }, [formIndex])

    useEffect(() => {
        onDone(done);
    }, [done, onDone])

    const change = useCallback((categoryId: number, questionId: number, value: string | string[]) => {
        updateResponse({categoryId,questionId, value});
        onDone(false);
    }, [updateResponse, onDone]);

    const visibleCategories =
        formIndex === undefined
            ? form?.questions as Category[]
            : form?.questions.filter(c =>
                form.forms[formIndex]?.includes(c.id)
            ) as Category[];

    return (
        <div className={style.outerContainer}>
            {selectedCategory ? (
                <QuestionView
                    category={selectedCategory}
                    goBack={() => setSelectedCategory(null)}
                    change={change}
                />
            ) : (
                <>
                    {form?.forms?.[formIndex]?.includes(100) ? (
                        <Intermission onDone={setDone} formIndex={formIndex} />
                    ) : (
                        <>
                            <Overview
                                categories={visibleCategories}
                                onSelectCategory={setSelectedCategory}
                            />
                            <Button
                                variant="contained"
                                onClick={() => setDone(true)}
                                disabled={done}
                                sx={{ margin: '0 1rem' }}
                            >
                                {t('done')}
                            </Button>
                        </>
                    )}

                </>

            )}
        </div>
    );
}
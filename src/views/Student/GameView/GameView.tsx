import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import Overview from "@genaipg/views/Student/GameView/OverView";
import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionView from "@genaipg/views/Student/GameView/QuestionView";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@genai-fi/base";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from "react-i18next";
import { updateResponseAtom } from "@genaipg/state/responseState";
import IntermissionDialog from "@genaipg/views/dialogs/IntermissionDialog/IntermissionDialog";
import TimelineDialog from "@genaipg/views/dialogs/TimelineDialog/TimelineDialog";
import { profileAtom } from "@genaipg/state/profileState";
import { INTERMISSION_FORM_ID, REVEAL_PROFILE_FORM_ID, TIMELINE_FORM_ID } from "@genaipg/constants/formIds";

interface Props {
    formIndex: number;
    onDone: (state: boolean) => void;
}

export default function Gameview({ formIndex, onDone }: Props) {
    const { t } = useTranslation();
    const updateResponse = useSetAtom(updateResponseAtom)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [done, setDone] = useState(false);
    const profile = useAtomValue(profileAtom);

    const unlockedCategories = useMemo(() => {
        if (!profile) return [];

        const categoriesIds = new Set<string>();

        for (let i = 0; i <= formIndex; i++) {
            const current = profile.forms[i];

            if (!current) continue;

            if (current.includes(REVEAL_PROFILE_FORM_ID) || current.includes(TIMELINE_FORM_ID))
                return profile.categories

            current.forEach(id => {
                if (id !== INTERMISSION_FORM_ID && id !== REVEAL_PROFILE_FORM_ID && id !== TIMELINE_FORM_ID && typeof id === 'string')
                    categoriesIds.add(id)
            })
        }

        return profile.categories.filter(category => categoriesIds.has(category.id));
    }, [profile, formIndex])

    useEffect(() => {
        setDone(false);
        setSelectedCategory(null);
    }, [formIndex])

    useEffect(() => {
        onDone(done);
    }, [done, onDone])

    const change = useCallback((categoryId: string, questionId: string, value: string | string[]) => {
        updateResponse({ categoryId, questionId, value });
        onDone(false);
    }, [updateResponse, onDone]);

    const currentForm = profile?.forms[formIndex];

    const isEnding = currentForm?.includes(REVEAL_PROFILE_FORM_ID) || currentForm?.includes(TIMELINE_FORM_ID);

    const currentIndex = selectedCategory
        ? unlockedCategories.findIndex(c => c.id === selectedCategory.id)
        : -1;

    const changeCategory = (index: number) => {
        if (index < 0 || index >= unlockedCategories.length) return;

        setSelectedCategory(unlockedCategories[index]);
    };

    return (
        <div className={style.gameContainer}>
            <div className={style.outerContainer}>
                <div className={`${style.waitOverlay} ${formIndex === -1 ? style.visible : ''}`}>
                    <span className={`${style.iconRing} ${formIndex === -1 ? style.iconAnimation : ''}`}>
                        <AccessTimeIcon fontSize="inherit" />
                    </span>
                    <div className={style.titleGroup}>
                        <h1>
                            {t("student.waitForTitle")}
                        </h1>
                        <h2>
                            {t("student.waitForStart")}
                        </h2>
                    </div>
                </div>
                {selectedCategory ? (
                    <QuestionView
                        category={selectedCategory}
                        goBack={() => setSelectedCategory(null)}
                        change={change}
                        currentIndex={currentIndex}
                        totalCategories={unlockedCategories.length}
                        goNext={changeCategory}
                        goPrevious={changeCategory}
                        disabled={isEnding}

                    />
                ) : (
                    <>
                        <>
                            <Overview
                                categories={unlockedCategories}
                                onSelectCategory={setSelectedCategory}
                                activeCategoriesIds={
                                    typeof profile?.forms[formIndex] === 'string'
                                        ? profile.forms[formIndex]
                                        : []
                                }
                            />
                            <div className={style.navigationFooter}>
                                <Button
                                    variant="contained"
                                    onClick={() => setDone(prev => !prev)}
                                    fullWidth
                                    sx={{
                                        margin: '0 1rem',
                                        background: done ? 'var(--bg-dark)' : 'var(--primary)'
                                    }}
                                >
                                    {done ? t('undone') : t('done')}
                                </Button>
                            </div>
                            <IntermissionDialog isOpen={profile?.forms[formIndex]?.includes(INTERMISSION_FORM_ID) ? true : false} onDone={setDone} formIndex={formIndex} />
                            <TimelineDialog isOpen={profile?.forms[formIndex]?.includes(TIMELINE_FORM_ID) ? true : false} />
                        </>
                    </>

                )}
            </div>
        </div>
    );
}
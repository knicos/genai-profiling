import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import Overview from "@genaipg/views/Student/GameView/OverView";
import { useState } from "react";
import QuestionView from "@genaipg/views/Student/GameView/QuestionView";
import { useAtomValue } from "jotai";
import { formAtom } from "@genaipg/state/profileState";
import SliderField from "@genaipg/components/FormFields/SliderField";

interface Props {
    formIndex: number;
}

export default function Gameview({ formIndex }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const form = useAtomValue(formAtom)

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
                />
            ) : (
                <>
                    {form?.forms?.[formIndex]?.includes(100) ? (
                        <div className={style.sliderContainer}>
                            <SliderField
                                label="How confident are you?"
                                onChange={() => console.log("hello")}
                                value="100"
                                min={0}
                                max={100}
                            />
                        </div>
                    ) : (
                        <Overview
                            categories={visibleCategories}
                            onSelectCategory={setSelectedCategory}
                        />
                    )}

                </>

            )}
        </div>
    );
}
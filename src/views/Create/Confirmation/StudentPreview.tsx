import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import Overview from "@genaipg/views/Student/GameView/OverView";
import { useState } from "react";
import QuestionView from "@genaipg/views/Student/GameView/QuestionView";
import { useAtomValue } from "jotai";
import { formOrderAtom, questionsAtom } from "@genaipg/state/createState";

interface Props {
    formIndex?: number; 
}

export default function StudentPreview({ formIndex }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const categories = useAtomValue(questionsAtom);
    const formOrder = useAtomValue(formOrderAtom);

    const visibleCategories =
        formIndex === undefined
            ? categories
            : categories.filter(c =>
                formOrder?.forms[formIndex]?.includes(c.id)
            );
    
    const currentIndex = selectedCategory
        ? visibleCategories.findIndex(c => c.id === selectedCategory.id)
        : -1

    const changeCategory = (index: number) => {
        setSelectedCategory(visibleCategories[index])
    }

    return (
        <div className={style.previewContainer}>
            <PhoneFrame>
                {selectedCategory ? (
                    <QuestionView
                        category={selectedCategory}
                        goBack={() => setSelectedCategory(null)}
                        goNext={changeCategory}
                        goPrevious={changeCategory}
                        totalCategories={visibleCategories.length}
                        currentIndex={currentIndex}
                    />
                ) : (
                    <Overview
                        categories={visibleCategories}
                        onSelectCategory={setSelectedCategory}
                    />
                )}
            </PhoneFrame>
        </div>
    );
}
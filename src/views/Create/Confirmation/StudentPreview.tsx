import { Category } from "@genaipg/components/Question/types";
import style from './style.module.css';
import PhoneFrame from "@genaipg/components/Templates/PhoneFrame";
import Overview from "@genaipg/views/Student/GameView/OverView";
import { useState } from "react";
import QuestionView from "@genaipg/views/Student/GameView/QuestionView";

interface Props {
    categories: Category[];
}

export default function StudentPreview({ categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    return (
        <div
            className={style.previewContainer}
        >
            <PhoneFrame>
                { selectedCategory ? (
                    <QuestionView category={selectedCategory} goBack={() => setSelectedCategory(null)}/>
                ) : (
                    <Overview categories={categories} onSelectCategory={setSelectedCategory}/>
                )}
            </PhoneFrame>
        </div>
    )
}
import { Category } from "@genaipg/components/Question/types";
import { getCategoryStatus, responseAtom } from "@genaipg/state/responseState";
import { useAtomValue } from "jotai";
import style from './style.module.css'
import CategoryButton from "@genaipg/components/Button/CategoryButton";
import Icon from "@genaipg/components/Icons/Icon";
import { ProgressRing } from "@genai-fi/base";
import { motion } from "framer-motion";

interface Props {
    category: Category;
    onSelectCategory: (category: Category) => void;
    highlighted?: boolean;
}


export default function CategoryItem({ category, onSelectCategory, highlighted = false }: Props) {
    const responses = useAtomValue(responseAtom);
    const status = getCategoryStatus(responses, category);

    return (
        <motion.div
            className={style.listItem}
            animate={
                highlighted
                    ? {
                        scale: [1, 1.04, 1],
                    }
                    : {}
            }
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <CategoryButton
                icon={<Icon icon={category.icon} />}
                highlighted={highlighted}
                label={category.category}
                onClick={() => onSelectCategory?.(category)}
            />
            <span className={style.badge}>
                <ProgressRing segments={5} completed={status} />
            </span>
        </motion.div>
    );
}   
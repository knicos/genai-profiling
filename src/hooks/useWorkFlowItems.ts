import { cluesAtom, questionsAtom } from "@genaipg/state/createState";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export type WorkFlowStatus = 'complete' | 'available' | 'blocked'

interface Item {
    id: string;
    status: WorkFlowStatus;
}

interface WorkFlow {
    items: Item[];
    usedCategories: Set<string>;
}

export default function useWorkFlowItems(): WorkFlow {
    const clues = useAtomValue(cluesAtom);
    const questions = useAtomValue(questionsAtom);

    return useMemo(() => {
        const basicInfoComplete = questions.every(q => {
            if (q.questions.length > 0) return true;
            return false
        });

        const usedCategories = new Set(clues.flatMap(c => c.category));
        const allCategoriesUsed = questions.every(q => usedCategories.has(q.category));
        const cluesComplete = clues.every(c =>
            c.visual !== null && c.clue.trim() !== '' && c.category.length > 0
        ) && allCategoriesUsed;

        return {
            items: [
                { id: 'profile', status: basicInfoComplete ? 'complete' : 'available' },
                { id: 'clues', status: cluesComplete ? 'complete' : 'available' },
                { id: 'preview', status: basicInfoComplete && cluesComplete ? 'complete' : 'available' }
            ],
            usedCategories,
        }
    }, [clues, questions])
}
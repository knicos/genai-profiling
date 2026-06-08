import { atom } from "jotai";
import { ClueData } from "@genaipg/views/Create/types";
import { Category, QuestionData } from "@genaipg/components/Question/types";

export const questionsAtom = atom<Category[]>([]);

export const questionCategoriesAtom = atom<string[]>((get) => {
    const questions = get(questionsAtom);

    return [
        ...new Set(
            questions.map((q) => q.category)
        )
    ]
})

export const addQuestionAtom = atom(
    null,
    (
        get,
        set,
        payload: {
            categoryId: number;
            question: Omit<QuestionData, "id">;
        }
    ) => {
        const categories = get(questionsAtom);

        const updated = categories.map(category => {
            if (category.id !== payload.categoryId) {
                return category;
            }

            const nextId =
                category.questions.length > 0
                    ? Math.max(
                        ...category.questions.map(q => q.id)
                    ) + 1
                    : 1;

            const newQuestion: QuestionData = {
                ...payload.question,
                id: nextId
            } as QuestionData;

            return {
                ...category,
                questions: [
                    ...category.questions,
                    newQuestion
                ]
            };
        });

        set(questionsAtom, updated);
    }
);

export const deleteQuestion = atom(
    null,
    (
        get,
        set,
        payload: {
            categoryId: string;
            questionId: number;
        }
    ) => {
        const categories = get(questionsAtom);

        const updated = categories.map((category) => {
            if (category.category !== payload.categoryId) {
                return category;
            }

            return {
                ...category,
                questions: category.questions.filter(
                    (q) => q.id !== payload.questionId
                )
            };
        });

        set(questionsAtom, updated);
    }
);

export const deleteCategory = atom(
    null,
    (
        get,
        set,
        payload: {
            category: string
        }
    ) => {
        const categories = get(questionsAtom)

        const updated = categories.filter((c) => c.category !== payload.category)
        
        set(questionsAtom, updated);
    }
)

export const updateQuestionAtom = atom(
    null,
    (
        get,
        set,
        payload: {
            categoryId: number;
            questionId: number;
            updates: Partial<QuestionData>;
        }
    ) => {
        const categories = get(questionsAtom);

        const updated = categories.map(category => {
            if (category.id !== payload.categoryId) {
                return category;
            }

            const updatedQuestions = category.questions.map(question => {
                if (question.id !== payload.questionId) {
                    return question;
                }

                return {
                    ...question,
                    ...payload.updates
                } as QuestionData;
            });

            return {
                ...category,
                questions: updatedQuestions
            };
        });

        set(questionsAtom, updated);
    }
);


export const cluesAtom = atom<ClueData[]>(
    Array.from({ length: 10 }, (_, i) => ({
        id: i,
        visual: undefined,
        clue: '',
        category: [] as string[]
    }))
);

export const updateClueAtom = atom(
    null,
    (
        get,
        set,
        payload: {
            clueId: number;
            updates: Partial<ClueData>;
        }
    ) => {
        const clues = get(cluesAtom);

        set(
            cluesAtom,
            clues.map(clue =>
                clue.id === payload.clueId
                    ? {
                        ...clue,
                        ...payload.updates
                    }
                    : clue

            )
        );
    }
);
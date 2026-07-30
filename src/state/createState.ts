import { atom } from "jotai";
import { ClueData } from "@genaipg/views/Create/types";
import { Category, QuestionData } from "@genaipg/components/Question/types";

// THIS WILL CHANGE
const MAX_SLIDES_PER_SECTION = 3;


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

type FormOrderState = { level: 1 | 2 | 3; forms: number[][]; };

export const formOrderAtom = atom<FormOrderState>();

export const createFormOrder = atom(
    null,
    (
        get,
        set,
        payload: {
            level: 1 | 2 | 3;
        }
    ) => {
        const categories = get(questionsAtom);
        const clues = get(cluesAtom);


        // Number for break
        const BREAK = 100;

        // Easy mode: every clue opens the category it belongs to 
        const forms: number[][] = [];

        if (payload.level === 1) {
            clues.forEach(clue => {
                const form: number[] = []

                clue.category.forEach(cat => {
                    const category = categories.find(c => c.category === cat);
                    if (category)
                        form.push(category.id);
                })

                forms.push(form);
            })
        }
        // Medium mode: Group of questions unlock per section. 
        else if (payload.level === 2) {

            for (let start = 0; start < clues.length; start += MAX_SLIDES_PER_SECTION) {
                const section = clues.slice(start, start + MAX_SLIDES_PER_SECTION);

                const sectionCategories: number[] = [];

                section.forEach(clue => {
                    clue.category.forEach(cat => {
                        const category = categories.find(c => c.category === cat);

                        if (category)
                            sectionCategories.push(category.id);
                    });
                });

                const uniqueCategories = [...new Set(sectionCategories)];

                section.forEach(() => {
                    forms.push(uniqueCategories);
                });
            }
        }
        //Hard mode: Every category is open 
        else if (payload.level === 3) {
            const allCategories: number[] = categories.map(c => c.id);

            clues.forEach(() => {
                forms.push([...allCategories]);
            })
        }

        // Create the breaks
        const withBreaks: number[][] = [];

        for (let i = 0; i < forms.length; i++) {
            withBreaks.push(forms[i]);

            const isEndOfSection = (i + 1) % MAX_SLIDES_PER_SECTION === 0;
            const isLast = i === forms.length - 1;

            if (isEndOfSection && !isLast)
                withBreaks.push([BREAK]);
        }

        // Collage slide where every clue is available and every category.
        const collageForm: number[] = categories.map(c => c.id);
        withBreaks.push(collageForm);

        set(formOrderAtom, {
            level: payload.level,
            forms: withBreaks,
        });
    }
)
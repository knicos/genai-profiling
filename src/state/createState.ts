import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { ClueData, EditorItem } from "@genaipg/views/Create/types";
import { Category, QuestionData } from "@genaipg/components/Question/types";
import { INTERMISSION_FORM_ID } from "@genaipg/constants/formIds";
import { randomId } from "@genai-fi/base";

export const questionsAtom = atomWithReset<Category[]>([]);

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
            categoryId: string;
            question: Omit<QuestionData, "id">;
        }
    ) => {
        const categories = get(questionsAtom);

        const updated = categories.map(category => {
            if (category.id !== payload.categoryId) {
                return category;
            }

            const newQuestion: QuestionData = {
                ...payload.question,
                id: randomId()
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
            questionId: string;
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

export const updateCategoryAtom = atom(
    null,
    (
        get,
        set,
        payload: {
            categoryId: string;
            updates: Partial<Category>;
        }
    ) => {
        const categories = get(questionsAtom);

        set(
            questionsAtom,
            categories.map(category =>
                category.id === payload.categoryId
                    ? { ...category, ...payload.updates }
                    : category
            )
        );
    }
);

export const updateQuestionAtom = atom(
    null,
    (
        get,
        set,
        payload: {
            categoryId: string;
            questionId: string;
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


const initialClues: ClueData[] = Array.from(
    { length: 4 },
    () => ({
        id: randomId(),
        visual: undefined,
        clue: '',
        category: [] as string[],
    })
);

export const cluesAtom = atomWithReset<ClueData[]>(initialClues);

export const addCheckpointAtom = atom(
    null,
    (
        _,
        set,
        payload: {
            clueId?: string;
        }
    ) => {
        set(editorItemsAtom, prev => {
            const newItem: EditorItem = {
                type: 'checkpoint',
            };

            if (!payload.clueId) {
                return [
                    ...prev,
                    newItem,
                ];
            }

            const clueIndex = prev.findIndex(
                item =>
                    item.type === 'clue' &&
                    item.id === payload.clueId
            );

            if (clueIndex === -1) {
                return [
                    ...prev,
                    newItem,
                ];
            }

            const updated = [...prev];

            updated.splice(
                clueIndex + 1,
                0,
                newItem
            );

            return updated;
        });
    }
);

export const deleteCheckpointAtom = atom(
    null,
    (
        _,
        set,
        payload: {
            index: number;
        }
    ) => {
        set(editorItemsAtom, prev =>
            prev.filter(
                (item, index) =>
                    index !== payload.index ||
                    item.type !== 'checkpoint'
            )
        );
    }
);

const initialEditorItems: EditorItem[] = initialClues.map(
    clue => ({
        type: 'clue',
        id: clue.id,
    })
);

export const editorItemsAtom = atomWithReset<EditorItem[]>(initialEditorItems);

export const addClueAtom = atom(
    null,
    (_, set) => {
        const newClue: ClueData = {
            id: randomId(),
            visual: undefined,
            clue: '',
            category: [],
        };

        set(cluesAtom, prev => [
            ...prev,
            newClue,
        ]);

        set(editorItemsAtom, prev => [
            ...prev,
            {
                type: 'clue',
                id: newClue.id,
            },
        ]);
    }
);

export const deleteClueAtom = atom(
    null,
    (
        _,
        set,
        payload: {
            clueId: string;
        }
    ) => {
        set(
            cluesAtom,
            prev =>
                prev.filter(
                    clue => clue.id !== payload.clueId
                )
        );

        set(
            editorItemsAtom,
            prev =>
                prev.filter(
                    item =>
                        !(
                            item.type === 'clue' &&
                            item.id === payload.clueId
                        )
                )
        );
    }
);

export const updateClueAtom = atom(
    null,
    (
        get,
        set,
        payload: {
            clueId: string;
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

export const reorderEditorItemsAtom = atom(
    null,
    (
        get,
        set,
        {
            sourceIndex,
            destinationIndex,
        }: {
            sourceIndex: number;
            destinationIndex: number;
        }
    ) => {
        const items = [...get(editorItemsAtom)];

        const [movedItem] = items.splice(sourceIndex, 1);

        items.splice(
            destinationIndex,
            0,
            movedItem
        );

        set(editorItemsAtom, items);
    }
);

export const orderedCluesAtom = atom((get) => {
    const items = get(editorItemsAtom);
    const clues = get(cluesAtom);

    const cluesById = new Map(clues.map(clue => [clue.id, clue]));

    return items
        .filter((item): item is Extract<EditorItem, { type: 'clue' }> =>
            item.type === 'clue'
        )
        .map(item => cluesById.get(item.id))
        .filter((clue): clue is ClueData => clue !== undefined);
});

type FormOrderState = { level: 1 | 2 | 3; forms: (number | string)[][]; };

export const formOrderAtom = atomWithReset<FormOrderState>({ level: 1, forms: [] });

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
        const editorItems = get(editorItemsAtom);

        const BREAK = INTERMISSION_FORM_ID;

        const clueForms = new Map<string, (string | number)[]>();

        if (payload.level === 1) {
            clues.forEach(clue => {
                const form: (number | string)[] = [];

                clue.category.forEach(cat => {
                    const category = categories.find(
                        c => c.category === cat
                    );

                    if (category) {
                        form.push(category.id);
                    }
                });

                clueForms.set(clue.id, form);
            });
        }

        else if (payload.level === 2) {
            const sections: ClueData[][] = [];
            let currentSection: ClueData[] = [];

            editorItems.forEach(item => {

                if (item.type === 'checkpoint') {
                    if (currentSection.length > 0) {
                        sections.push(currentSection);
                        currentSection = [];
                    }

                    return;
                }

                const clue = clues.find(
                    clue => clue.id === item.id
                );

                if (clue) {
                    currentSection.push(clue);
                }
            });

            if (currentSection.length > 0) {
                sections.push(currentSection);
            }

            sections.forEach(section => {
                const sectionCategories: string[] = [];

                section.forEach(clue => {
                    clue.category.forEach(cat => {
                        const category = categories.find(
                            c => c.category === cat
                        );

                        if (category) {
                            sectionCategories.push(
                                category.id
                            );
                        }
                    });
                });

                const uniqueCategories = [
                    ...new Set(sectionCategories)
                ];

                section.forEach(clue => {
                    clueForms.set(
                        clue.id,
                        [...uniqueCategories]
                    );
                });
            });
        }

        else if (payload.level === 3) {
            const allCategories: string[] =
                categories.map(c => c.id);

            clues.forEach(clue => {
                clueForms.set(
                    clue.id,
                    [...allCategories]
                );
            });
        }

        const withBreaks: (number | string)[][] = [];

        editorItems.forEach(item => {

            if (item.type === 'checkpoint') {
                withBreaks.push([BREAK]);
                return;
            }

            const form = clueForms.get(item.id);

            if (form) {
                withBreaks.push(form);
            }
        });


        const collageForm: (number | string)[] =
            categories.map(c => c.id);

        withBreaks.push(collageForm);

        set(formOrderAtom, {
            level: payload.level,
            forms: withBreaks,
        });
    }
);
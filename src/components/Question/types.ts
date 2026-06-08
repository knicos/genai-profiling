export type QuestionType = 'text' | 'slider' | 'multichoice' | 'singlechoice' | 'largetext' | 'message';

export interface Category {
    id: number;
    category: string;
    questions: QuestionData[];
}

interface QuestionBase {
    id: number;
    text: string;
    type: QuestionType;
}

export interface QuestionText extends QuestionBase {
    type: 'text';
}

export interface QuestionMessage extends QuestionBase {
    type: 'message';
    size?: 'small' | 'medium' | 'large';
}

export interface QuestionLargeText extends QuestionBase {
    type: 'largetext';
}

export interface QuestionSlider extends QuestionBase {
    type: 'slider';
    min: number;
    max: number;
    step?: number;
    correct?: number;
    range?: boolean;
}

export interface QuestionMulti extends QuestionBase {
    type: 'multichoice';
    options: string[];
    correct?: string[];
}

export interface QuestionChoice extends QuestionBase {
    type: 'singlechoice';
    options: string[];
    default?: string;
    correct?: string;
}

export type QuestionData =
    | QuestionChoice
    | QuestionMulti
    | QuestionSlider
    | QuestionLargeText
    | QuestionText
    | QuestionMessage;

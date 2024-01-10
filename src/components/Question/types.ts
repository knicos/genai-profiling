export type QuestionType = 'text' | 'slider' | 'multichoice' | 'singlechoice' | 'largetext';

interface QuestionBase {
    id: number;
    text: string;
    type: QuestionType;
    min?: number;
    max?: number;
    options?: string[];
}

interface QuestionText extends QuestionBase {
    type: 'text';
}

interface QuestionLargeText extends QuestionBase {
    type: 'largetext';
}

interface QuestionSlider extends QuestionBase {
    type: 'slider';
    min: number;
    max: number;
    step: number;
}

interface QuestionMulti extends QuestionBase {
    type: 'multichoice';
    options: string[];
}

interface QuestionChoice extends QuestionBase {
    type: 'singlechoice';
    options: string[];
}

export type QuestionData = QuestionChoice | QuestionMulti | QuestionSlider | QuestionLargeText | QuestionText;

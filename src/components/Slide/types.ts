export type SlideType = 'qr' | 'question' | 'image';

interface SlideBase {
    type: SlideType;
}

export interface SlideQuestion extends SlideBase {
    type: 'question';
    text: string;
    fontSize?: number;
}

export type SlideMeta = SlideQuestion;

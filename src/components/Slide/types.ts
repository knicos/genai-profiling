import { ClueData } from "@genaipg/views/Create/types";

export type SlideType = 'qr' | 'question' | 'image' | 'board' | 'demo';

interface SlideBase {
    type: SlideType;
    form?: number;
}

export interface SlideQuestion extends SlideBase {
    type: 'question';
    text: string;
    fontSize?: number;
}

export interface SlideBoard extends SlideBase {
    type: 'board';
    questions: number[];
}

export interface SlideImage extends SlideBase {
    type: 'image';
    url: string;
    id?: number;
    scale?: number;
    label?: string;
}

export interface SlideDemo extends SlideBase {
    type: 'demo';
    label?: string;
    clue: ClueData;
}

export type SlideMeta = SlideQuestion | SlideImage | SlideBoard | SlideDemo;

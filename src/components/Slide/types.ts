import { ClueData } from "@genaipg/views/Create/types";

export type SlideType = 'qr' | 'question' | 'image' | 'board' | 'demo' | 'checkpoint' | 'ending' | 'collage';

interface SlideBase {
    type: SlideType;
    form?: number;
}

export interface SlideQuestion extends SlideBase {
    type: 'question';
    text: string;
    fontSize?: number;
}


export interface StickyBoardQuestions {
    categoryId: string;
    questionId: string;
}
export interface SlideBoard extends SlideBase {
    type: 'board';
    steps: StickyBoardQuestions[];
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

export interface SlideCheckpoint extends SlideBase {
    type: 'checkpoint';
}

export type EndingStepId = 'revealProfile' | 'timeline';

export interface EndingStep {
    id: "revealProfile" | "timeline";
    form: number;
}

export interface SlideEnding extends SlideBase {
    type: 'ending';
    steps: EndingStep[];
}

export interface SlideCollage extends SlideBase {
    type: 'collage';
    id?: number;
}

export type SlideMeta = SlideQuestion | SlideImage | SlideBoard | SlideDemo | SlideCheckpoint | SlideCollage | SlideEnding;

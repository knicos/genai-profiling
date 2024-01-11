export type SlideType = 'qr' | 'question' | 'image';

interface SlideBase {
    type: SlideType;
    form?: number;
}

export interface SlideQuestion extends SlideBase {
    type: 'question';
    text: string;
    fontSize?: number;
}

export interface SlideImage extends SlideBase {
    type: 'image';
    url: string;
    scale?: number;
    label?: string;
}

export type SlideMeta = SlideQuestion | SlideImage;

import { SlideImage } from "@genaipg/components/Slide/types";
import { TemplateData } from "@genaipg/components/Templates/types";

export interface ClueData {
    id: string;
    visual: TemplateData | SlideImage | undefined;
    clue: string;
    category: string[];
}

export type EditorItem =
    | { type: 'clue'; id: string }
    | { type: 'checkpoint'; };
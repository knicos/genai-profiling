import { SlideImage } from "@genaipg/components/Slide/types";
import { TemplateData } from "@genaipg/components/Templates/types";

export interface ClueData {
    id: number;
    visual: TemplateData | SlideImage | undefined;
    clue: string;
    category: string[];
}

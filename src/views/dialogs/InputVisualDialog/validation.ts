import { TemplateData, TemplateMemoryMap, TemplateSearches, TemplateType, TemplateWatchHistory } from "@genaipg/components/Templates/types";
import { Templates } from "./templates";

// TODO: Make this more dynamic too

export function isFormValid(
    draft: TemplateData,
    template: TemplateType
) {
    const config = Templates.volunteeredData[template] ??
        Templates.observedData[template];
    
    return config.fields.every(field => {
        if (!field.required) return true;

        if (field.label === 'searches') {
            const searches = (draft as TemplateSearches).searches ?? [];
            return searches.length === 4 && searches.every(s => s?.trim());
        } else if (field.label === 'videos') {
            const videos = (draft as TemplateWatchHistory).videos ?? [];
            return videos.length > 0 && videos.length < 7;
        } else if (field.label === 'memories') {
            const memories = (draft as TemplateMemoryMap).memories ?? [];
            return memories.length > 0
        } else {
            const value = (draft as unknown as Record<string, unknown>)[field.label];
            return typeof value === 'string' && value.trim().length > 0;
        }
    })
}
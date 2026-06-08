import { TemplateData, TemplateSearches, TemplateStreaming, TemplateType } from "@genaipg/components/Templates/types";
import { Templates } from "./templates";

// TODO: Make this more dynamic too

export function isFormValid(
    draft: TemplateData,
    template: TemplateType
) {
    const config = Templates[template]
    return config.fields.every(field => {
        if (!field.required) return true;

        if (field.label === 'searches') {
            const searches = (draft as TemplateSearches).searches ?? [];
            return searches.length === 4 && searches.every(s => s?.trim());
        } else if (field.label === 'title') {
            return !!(draft as TemplateStreaming).title?.trim();
        } else if (field.label === 'artist'){
            return !!(draft as TemplateStreaming).artist?.trim();
        } else {
            return !!(draft as TemplateStreaming).url?.trim();
        }
    })
}
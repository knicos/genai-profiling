import MusicNote from '@mui/icons-material/MusicNote';
import Search from '@mui/icons-material/Search';
import { TemplateConfig } from "./types";
import { TemplateType } from "@genaipg/components/Templates/types";

export const Templates: Record<TemplateType, TemplateConfig> = {
    streaming: {
        icon: MusicNote,
        color: '#eeedfe',
        fields: [
            {
                type: 'image',
                label: 'url',
                required: true,
            },
            {
                type: 'text',
                label: 'title',
                required: true,
            },
            {
                type: 'text',
                label: 'artist',
                required: true,
            }
        ]
    },
    searches: {
        icon: Search, color: '#fbeaf0', fields: [
            {
                type: 'text',
                label: 'searches',
                required: true,
            },
            {
                type: 'text',
                label: 'searches',
                required: true,

            },
            {
                type: 'text',
                label: 'searches',
                required: true,

            },
            {
                type: 'text',
                label: 'searches',
                required: true,
            }

        ]
    },
    // reactions: {icon: AddReaction,  color: '#faeeda', fields: []},
    // forYou: {icon: Recommend,  color: '#e6f1fb', fields: []},
    // locations: {icon: Map,   color: '#d1e7d1', fields: []},
}
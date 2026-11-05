import MusicNote from '@mui/icons-material/MusicNote';
import Search from '@mui/icons-material/Search';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CommentIcon from '@mui/icons-material/Comment';
import HistoryIcon from '@mui/icons-material/History';
import { TemplateConfig } from "./types";

export const Templates: Record<
    'volunteeredData' | 'observedData' /*| 'inferredData'*/,
    Record<string, TemplateConfig>
> = {
    volunteeredData: {
        post: {
            icon: AddPhotoAlternateIcon,
            color: 'color-mix(in srgb, var(--darker-yellow) 30%, transparent)',
            fields: [
                { type: 'image', label: 'profilePicUrl', required: true },
                { type: 'text', label: 'username', maxLength: 30, required: true },
                { type: 'image', label: 'url', required: true },
                { type: 'check', label: 'checked', required: false },
                { type: 'text', label: 'caption', maxLength: 115, required: true, multiline: true },
            ],
        },
        story: {
            icon: AddAPhotoIcon,
            color: 'color-mix(in srgb, var(--error-light) 30%, transparent)',
            fields: [
                { type: 'image', label: 'profilePicUrl', required: true },
                { type: 'text', label: 'username', maxLength: 30, required: true },
                { type: 'image', label: 'url', required: true },
            ],
        },
        comments: {
            icon: CommentIcon,
            color: 'color-mix(in srgb, var(--info-light) 30%, transparent)',
            fields: [
                { type: 'image', label: 'url', required: true },
                { type: 'image', label: 'profilePicUrl', required: true },
                { type: 'text', label: 'comment', maxLength: 70, required: true, multiline: true },
            ],
        },
    },

    observedData: {
        streaming: {
            icon: MusicNote,
            color: 'color-mix(in srgb, var(--secondary-light) 30%, transparent)',
            fields: [
                { type: 'image', label: 'url', required: true },
                { type: 'text', label: 'title', maxLength: 35, required: true },
                { type: 'text', label: 'artist', maxLength: 40, required: true },
            ],
        },
        searches: {
            icon: Search,
            color: 'color-mix(in srgb, var(--green) 30%, transparent)',
            fields: [
                { type: 'text', label: 'searches', maxLength: 40, required: true },
                { type: 'text', label: 'searches', maxLength: 40, required: true },
                { type: 'text', label: 'searches', maxLength: 40, required: true },
                { type: 'text', label: 'searches', maxLength: 40, required: true },
            ],
        },
        memoryMap: {
            icon: PhotoLibraryIcon,
            color: 'color-mix(in srgb, var(--blue-green) 30%, transparent)',
            fields: [
                { type: 'image', label: 'url', required: true },
                { type: 'image', label: 'profilePicUrl', required: true },
                { type: 'memoryMap', label: 'memories', required: true },
            ],
        },
        shortVideo: {
            icon: SlideshowIcon,
            color: 'color-mix(in srgb, var(--blue) 30%, transparent)',
            fields: [
                { type: 'image', label: 'profilePicUrl', required: true },
                { type: 'text', label: 'username', maxLength: 30, required: true },
                { type: 'image', label: 'url', required: true },
                { type: 'check', label: 'checked', required: false },
                { type: 'text', label: 'caption', maxLength: 100, required: true, multiline: true },
            ],
        },
        watchHistory: {
            icon: HistoryIcon,
            color: 'color-mix(in srgb, var(--orange) 30%, transparent)',
            fields: [
                { type: 'image', label: 'profilePicUrl', required: true },
                { type: 'group', label: 'checked', required: false, fields: [
                    { type: 'check', label: 'checked', required: false },
                    {type: 'text', label: 'time1', maxLength: 30, required: false, enableIf: { field: 'checked', equals: true }, },
                    {type: 'text', label: 'time2', maxLength: 30, required: false, enableIf: { field: 'checked', equals: true }, },
                ]
                },
                { 
                    type: 'video', 
                    label: 'videos', 
                    required: true 
                },
            ],
        },
    },

    //inferredData: {},
};
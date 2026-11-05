import { ComponentType } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

export type Source = 'template' | 'upload';
export type Step = 'source' | Source | 'form' | 'preview';

export interface FormField {
    label: string;
    type: 'text' | 'select' | 'image' | 'memoryMap' | 'check' | 'video' | 'group';
    maxLength?: number;
    placeholder?: string;
    options?: string[];
    checked?: boolean;
    enableIf?: {
        field: string;
        equals: boolean | string;
    };
    required: boolean;
    multiline?: boolean;
    fields?: FormField[];
    listKey?: string;       
    itemLabelKey?: string;
}

export interface TemplateConfig {
    icon: ComponentType<SvgIconProps>;
    color: string;
    fields: FormField[];
}


import { ComponentType } from "react";

export type Source = 'template' | 'upload';
export type Step = 'source' | Source | 'form' | 'preview';

export interface FormField {
    label: string;
    type: 'text' | 'select' | 'image';
    placeholder?: string;
    options?: string[];
    required: boolean;
}

export interface TemplateConfig {
    icon: ComponentType;
    color: string;
    fields: FormField[];
}


export type TemplateType = 
    | 'streaming' // song / podcast listening
    | 'searches'    // search history
    // | 'reactions'   // likes, saves, comments
    // | 'forYou'  // For you page / recommended content
    // | 'locations'   // Places visited, map etc.
    // | 'tagged' // Photos / posts tagged in
    // | 'stories' // Posted story
    // | 'shortVideo' // reels, tiktoks, shorts
    // | 'following' // accounts they follow
    // | 'shared' // Things their friends have shared

interface TemplateBase {
    id?: number;
    type: TemplateType;
}

export interface TemplateStreaming extends TemplateBase {
    type: 'streaming';
    url?: string;
    title?: string;
    artist?: string;
}

export interface TemplateSearches extends TemplateBase {
    type: 'searches';
    searches: string[];
}

export type TemplateData = 
    | TemplateStreaming
    | TemplateSearches

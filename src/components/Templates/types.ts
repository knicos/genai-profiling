export type TemplateType = 
    | 'streaming' // song / podcast listening
    | 'searches'    // search history
    | 'memoryMap'   // map of places visited
    | 'post' // Liked post, posted, watched posts etc.
    | 'story' // Posted story
    | 'shortVideo' // reels, tiktoks, shorts
    | 'comments' // commented to a post vide etc.
    | 'watchHistory'
    // | 'reactions'   // likes, saves, comments
    // | 'forYou'  // For you page / recommended content
    // | 'locations'   // Places visited, map etc.
    // | 'tagged' // Photos / posts tagged in
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
    searches?: string[];
}

export interface TemplateMemoryMap extends TemplateBase {
    type: 'memoryMap';
    url?: string;
    profilePicUrl?: string;
    memories?: memory[];
}

export interface memory {
    id: string;
    url: string;
    x: number;
    y: number;
}

export interface TemplatePost extends TemplateBase {
    type: 'post';
    url?: string;
    profilePicUrl?: string;
    username?: string;
    caption?: string;
    checked?: boolean;
}

export interface TemplateShortVideo extends TemplateBase {
    type: 'shortVideo';
    url?: string;
    profilePicUrl?: string;
    username?: string;
    caption?: string;
    checked?: boolean;
}

export interface TemplateStory extends TemplateBase {
    type: 'story';
    url?: string;
    profilePicUrl?: string;
    username?: string;
}

export interface TemplateCommented extends TemplateBase {
    type: 'comments';
    url?: string;
    profilePicUrl?: string; 
    comment?: string;
}

export interface TemplateWatchHistory extends TemplateBase {
    type: 'watchHistory';
    profilePicUrl?: string;
    checked?: boolean;
    time1?: string;
    time2?: string;
    videos?: video[];
}

export interface video {
    id: string;
    url: string; 
    title: string;
    creator: string;
}

export type TemplateData = 
    | TemplateStreaming
    | TemplateSearches
    | TemplateMemoryMap
    | TemplatePost
    | TemplateShortVideo
    | TemplateStory
    | TemplateCommented
    | TemplateWatchHistory
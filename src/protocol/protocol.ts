import { PeerEvent, BuiltinEvent } from '@genai-fi/base';
import { ProfileMeta } from '@genaipg/components/ContentLoaders/types';
import { UserTimelineData } from '@genaipg/components/Slide/Ending/types';

export interface UserRegistrationEvent extends PeerEvent {
    event: 'pg:reguser';
    username: string;
    id: string;
}

export interface UserEntry {
    name: string;
    id: string;
}

export interface UserListEvent extends PeerEvent {
    event: 'pg:users';
    users: UserEntry[];
}

export interface ConfigEvent extends PeerEvent {
    event: 'pg:config';
    material: string;
    lang: string;
}

export interface DoneEvent extends PeerEvent {
    event: 'pg:done';
    done: boolean;
    id: string;
}

export interface ProfileZipEvent extends PeerEvent {
    event: 'pg:profile';
    data: ProfileMeta;
}

export interface ChangeFormEvent extends PeerEvent {
    event: 'pg:changeform';
    form: number;
}

export interface ResponseData {
    timestamp: number;
    date: string;
    categoryId: string;
    questionId: string;
    value: string | string[];
    form: number;
}

export interface QuestionResponseEvent extends PeerEvent, ResponseData {
    event: 'pg:response';
    username: string;
    userId: string;
}

export interface IntermissionResponseData {
    timestamp: number;
    date: string;
    value: string;
    form: number
}

export interface IntermissionResponseEvent extends PeerEvent, IntermissionResponseData {
    event: 'pg:intermission',
    username: string,
    userId: string;
}

export interface ResponseEntry {
    id: string;
    value: string | string[];
}

export interface CategoryEntry {
    id: string;
    questions: ResponseEntry[];
}

export interface ResponsesEvent extends PeerEvent {
    event: 'pg:responses';
    userId: string;
    responses: CategoryEntry[];
}

export interface TimelineDataEvent extends PeerEvent {
    event: 'pg:timeline';
    data: UserTimelineData[];
}

export type EventProtocol =
    | BuiltinEvent
    | UserRegistrationEvent
    | ChangeFormEvent
    | QuestionResponseEvent
    | ResponsesEvent
    | DoneEvent
    | ConfigEvent
    | UserListEvent
    | ProfileZipEvent
    | IntermissionResponseEvent
    | TimelineDataEvent;

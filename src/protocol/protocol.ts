import { QuestionData } from '@genaipg/components/Question/types';
import { PeerEvent, BuiltinEvent } from '@genaipg/hooks/peer';

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

export interface DoneEvent extends PeerEvent {
    event: 'pg:done';
    done: boolean;
    id: string;
}

export interface ChangeFormEvent extends PeerEvent {
    event: 'pg:changeform';
    form: number;
}

export interface ResponseData {
    timestamp: number;
    date: string;
    question: QuestionData | number;
    value: string;
    form: number;
}

export interface QuestionResponseEvent extends PeerEvent, ResponseData {
    event: 'pg:response';
    username: string;
    userId: string;
}

export interface ResponseEntry {
    id: number;
    value: string;
}

export interface ResponsesEvent extends PeerEvent {
    event: 'pg:responses';
    userId: string;
    responses: ResponseEntry[];
}

export type EventProtocol =
    | BuiltinEvent
    | UserRegistrationEvent
    | ChangeFormEvent
    | QuestionResponseEvent
    | ResponsesEvent
    | DoneEvent
    | UserListEvent;

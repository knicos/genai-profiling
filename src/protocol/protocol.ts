import { PeerEvent, BuiltinEvent } from '@genaipg/hooks/peer';

export interface UserRegistrationEvent extends PeerEvent {
    event: 'pg:reguser';
    username: string;
    id: string;
}

export interface ChangeFormEvent extends PeerEvent {
    event: 'pg:changeform';
    form: number;
}

export interface QuestionResponseEvent extends PeerEvent {
    event: 'pg:response';
    username: string;
    userId: string;
    timestamp: number;
    date: string;
    question: number;
    value: string;
}

export type EventProtocol = BuiltinEvent | UserRegistrationEvent | ChangeFormEvent | QuestionResponseEvent;

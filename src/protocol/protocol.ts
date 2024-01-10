import { PeerEvent, BuiltinEvent } from '@genaipg/hooks/peer';

export interface UserRegistrationEvent extends PeerEvent {
    event: 'pg:reguser';
    username: string;
}

export interface ChangeFormEvent extends PeerEvent {
    event: 'pg:changeform';
    form: number;
}

export type EventProtocol = BuiltinEvent | UserRegistrationEvent | ChangeFormEvent;

import { PeerEvent, BuiltinEvent } from '@genaipg/hooks/peer';

export interface UserRegistrationEvent extends PeerEvent {
    event: 'eter:reguser';
    username: string;
}

export type EventProtocol = BuiltinEvent | UserRegistrationEvent;

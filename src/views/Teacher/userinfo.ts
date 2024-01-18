import { DataConnection } from 'peerjs';

export interface UserInfo {
    id: string;
    username: string;
    connection: DataConnection;
}

import { Connection } from '@genai-fi/base';
import { EventProtocol } from '@genaipg/protocol/protocol';

export interface UserInfo {
    id: string;
    username: string;
    connection: Connection<EventProtocol>;
}

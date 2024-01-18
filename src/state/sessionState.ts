import { UserEntry } from '@genaipg/protocol/protocol';
import { atom } from 'recoil';

export const availableUsers = atom<UserEntry[]>({
    key: 'availableUsers',
    default: [],
});

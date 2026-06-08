import { UserEntry } from '@genaipg/protocol/protocol';
import { atom } from 'jotai';

export const availableUsers = atom<Set<UserEntry>>(new Set<UserEntry>());

import randomId from '@genaipg/util/randomId';
import { useRef } from 'react';

export default function useRandom(size: number): string {
    const ref = useRef<string>();

    if (ref.current === undefined) {
        ref.current = randomId(size);
    }

    return ref.current;
}

import randomId from '@genaipg/util/randomId';
import { useMemo } from 'react';

export function useID(size?: number) {
    return useMemo(() => {
        const saved = window.sessionStorage.getItem(`genai-pg-idcode-${size}`);
        if (saved) {
            return saved;
        } else {
            const newcode = randomId(size);
            window.sessionStorage.setItem(`genai-pg-idcode-${size}`, newcode);
            return newcode;
        }
    }, [size]);
}

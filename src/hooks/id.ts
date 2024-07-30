import { randomId } from '@knicos/genai-base';
import { useCallback, useEffect, useMemo, useState } from 'react';

function makeId(size: number) {
    const saved = window.sessionStorage.getItem(`genai-pg-idcode-${size}`);
    if (saved) {
        return saved;
    } else {
        const newcode = randomId(size);
        window.sessionStorage.setItem(`genai-pg-idcode-${size}`, newcode);
        return newcode;
    }
}

export function useID(size?: number) {
    return useMemo(() => {
        return makeId(size || 5);
    }, [size]);
}

export function useChangeableID(size?: number): [string, (id: string) => void] {
    const [id, setId] = useState<string>(() => makeId(size || 5));
    useEffect(() => {
        setId(makeId(size || 5));
    }, [size]);

    const update = useCallback(
        (id: string) => {
            window.sessionStorage.setItem(`genai-pg-idcode-${size}`, id);
            setId(id);
        },
        [size]
    );

    return [id, update];
}

import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
    label: string;
    min: number;
    max: number;
    step?: number;
    range?: boolean;
    value: string;
    onChange: (value: string) => void;
}

function parseRange(value: string, min: number): number | number[] {
    if (value) {
        const s = value.split(':');
        if (s.length === 2) return [parseInt(s[0]), parseInt(s[1])];
    }
    return min;
}

function joinRange(value: number | number[]): string {
    return Array.isArray(value) ? value.join(':') : `${value}`;
}

export default function SliderField({ label, min, max, step = 1, range, value, onChange }: Props) {
    const [v, setV] = useState<number | number[]>(range ? [min, max] : min);

    useEffect(() => {
        setV(range ? parseRange(value, min) : Number(value) || min);
    }, [value, min, max, range]);

    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend>{label}</legend>
            <Slider
                style={{ marginTop: '2rem', marginLeft: '1rem', marginRight: '1rem', width: 'calc(100% - 2rem)' }}
                value={v}
                onChange={(_, newValue) => setV(newValue)}
                onChangeCommitted={(_, val) => onChange(joinRange(val))}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="on"
            />
        </fieldset>
    );
}
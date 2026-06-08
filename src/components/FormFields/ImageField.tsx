import {useRef} from 'react';
import { Button } from '../Button/Button';
import style from './style.module.css';


interface Props {
    label: string;
    text: string;
    onChange: (value: string) => void;
}

export default function ImageField({ label, text, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend className={style.fieldLabel}>
                {label}
            </legend>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        onChange(URL.createObjectURL(file));
                    }
                }}
            />

            <Button
                onClick={() => fileInputRef.current?.click()}
                variant='contained'
            >
                {text}
            </Button>
        </fieldset>
    );
}
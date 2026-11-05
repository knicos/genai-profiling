import {useRef} from 'react';
import style from './style.module.css';
import { Button } from '@genai-fi/base';
import { FONT_SIZE } from '@genaipg/style/typography';


interface Props {
    label: string;
    sublabel?: string;
    text: string;
    onChange: (value: string) => void;
    required?: boolean;
    fontSize?: string;
    normal?: boolean;
}

export default function ImageField({ 
    label, 
    sublabel, 
    text, 
    onChange, 
    required, 
    fontSize = FONT_SIZE.large, 
    normal 
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend 
                className={style.fieldLabel}
                style={{ 
                    fontSize,
                    fontWeight: normal ? 'normal' : 'bold'
                }}
            >
                <div>
                    {required && <span aria-hidden="true">* </span>}
                    {label}
                </div>
                {sublabel &&
                    <div className={style.sublabel}>
                        {sublabel}
                    </div>
                }
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
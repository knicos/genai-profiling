import { Checkbox, FormControlLabel } from '@mui/material';
import style from './style.module.css'
import { FONT_SIZE } from '@genaipg/style/typography';

interface Props {
    label: string;
    sublabel?: string;
    checked?: boolean;
    text?: string;
    onChange: (value: boolean) => void;
    fontSize?: string;
    required?: boolean;
    normal?: boolean;
}

export default function CheckBoxField({ label, sublabel, checked, text, onChange, fontSize = FONT_SIZE.large, required, normal }: Props) {
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

            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={(event) => onChange(event.target.checked)}
                    />
                }
                label={text}
            />
        </fieldset>
    )
}
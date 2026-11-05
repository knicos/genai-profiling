import TextField, { TextFieldProps } from "@mui/material/TextField";
import style from './style.module.css';
import { FONT_SIZE } from "@genaipg/style/typography";




interface Props extends Omit<TextFieldProps, 'onChange' | 'value'> {
    title: string;
    placeholder?: string;
    value: string | null;
    disabled?: boolean;
    onChange: (value: string) => void;
    required?: boolean;
    subtitle?: string;
    fontSize?: string;
    normal?: boolean;
}

export default function TextArea({ title, placeholder, value, disabled, onChange, required, fontSize = FONT_SIZE.large, normal, ...props }: Props) {
    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>   
            <legend 
                className={`${style.fieldLabel} ${disabled && style.disabled}`} 
                style={{ 
                    fontSize, 
                    fontWeight: normal ? 'normal' : 'bold' 
                }}
            >
                <div>
                    {required && <span aria-hidden="true">* </span>}
                    {title}
                </div>
            </legend>

            <TextField
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                sx={{
                    '& .MuiInputBase-root': {
                        backgroundColor: 'white',
                    },
                }}
                disabled={disabled}
                {...props}
            />
        </fieldset>
    );
}
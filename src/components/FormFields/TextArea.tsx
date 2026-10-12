import TextField, { TextFieldProps } from "@mui/material/TextField";
import style from './style.module.css';


interface Props extends Omit<TextFieldProps, 'onChange' | 'value'> {
    title: string;
    placeholder?: string;
    value: string | null;
    onChange: (value: string) => void;
    required?: boolean;
    subtitle?: string;
}

export default function TextArea({ title, placeholder, value, onChange, required, subtitle, ...props }: Props) {
    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend className={style.fieldLabel}>
                <div>
                    {required && <span aria-hidden="true">* </span>}
                    {title}
                </div>
                {subtitle &&
                    <div className={style.sublabel}>
                        {subtitle}
                    </div>
                }
            </legend>

            <TextField
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                sx={{ background: 'white' }}
                fullWidth
                {...props}
            />
        </fieldset>
    );
}
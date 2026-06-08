import TextField, { TextFieldProps } from "@mui/material/TextField";
import style from './style.module.css';


interface Props extends  Omit<TextFieldProps, 'onChange' | 'value'>  {
    title: string;
    placeholder?: string;
    value: string | null;
    onChange: (value: string) => void;
}

export default function TextArea({ title, placeholder, value, onChange, ...props }: Props) {
    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend className={style.fieldLabel}>
                {title}
            </legend>

            <TextField
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                sx= {{ background: 'white' }}
                fullWidth
                {...props}
            />
        </fieldset>
    );
}
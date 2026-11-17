import { Checkbox, FormGroup, FormControlLabel, styled } from "@mui/material";
import style from './style.module.css';
import Check from "@mui/icons-material/Check";
import { FONT_SIZE } from "@genaipg/style/typography";

const ChipLabel = styled(FormControlLabel)({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    border: '2px solid var(--paleGreen)',
    outline: '3px solid transparent',
    padding: '0.5rem 1.25rem',
    borderRadius: '5rem',
    color: 'var(--primary-dark)',
    cursor: 'pointer',
    transition: 'all 0.1s',
    '&:hover, &:focus-within': {
        borderColor: 'transparent',
        outlineColor: 'var(--primary-dark)'
    },
    '& .MuiFormControlLabel-label': {
        fontSize: '1em',
        textAlign: 'center',
        display: 'inline-flex',
        alignItems: 'center',
    },
    '&.Mui-disabled .MuiFormControlLabel-label': {
        color: 'rgba(0, 0, 0, 0.65)',
    },
    '&.Mui-disabled': {
        cursor: 'default',
        pointerEvents: 'none',
        filter: 'grayscale(1)'
    },
})

interface Props {
    label: string;
    options: string[];
    value?: string[];
    onChange: (value: string[]) => void;
    markedOptions?: Set<string>;
    sublabel?: string;
    disabled?: boolean;
    required?: boolean;
    normal?: boolean;
    fontSize?: string
}

export default function MultiChoice({ label, options, value = [], onChange, markedOptions, sublabel, disabled, required, normal, fontSize = FONT_SIZE.large }: Props) {

    const handleToggle = (option: string) => {

        if (disabled) return;

        const updated = value.includes(option)
            ? value.filter(o => o !== option)
            : [...value, option];
        onChange(updated);
    };

    return (
        <fieldset style={{ containerType: "inline-size", border: 0, padding: 0, margin: 0, width: '100%' }}>
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
            <FormGroup
                className={style.formGroup}
            >
                {options.map(option => {
                    const selected = value.includes(option);
                    const marked = markedOptions?.has(option);
                    return (
                        <ChipLabel
                            key={option}
                            className={`${selected ? style.selected : ''}`}
                            sx={{ margin: 0 }}
                            onClick={e => {
                                e.preventDefault();
                                handleToggle(option);
                            }}
                            disabled={disabled}
                            control={
                                <Checkbox
                                    checked={selected}
                                    className={style.hiddenCheckbox}
                                    sx={{ position: 'absolute' }}
                                    disabled={disabled}
                                />
                            }
                            label={
                                <>
                                    {marked && <Check fontSize="small" color="inherit" />}
                                    {option}
                                </>
                            }
                        />
                    );
                })}
            </FormGroup>
        </fieldset>
    );
}
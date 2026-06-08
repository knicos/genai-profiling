import { Checkbox, FormGroup, FormControlLabel, styled } from "@mui/material";
import style from './style.module.css';
import Check from "@mui/icons-material/Check";

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
    }
})

interface Props {
    label: string;
    options: string[];
    value?: string[];
    onChange: (value: string[]) => void;
    markedOptions?: Set<string>;
}

export default function MultiChoice({ label, options, value = [], onChange, markedOptions }: Props) {
    const handleToggle = (option: string) => {
        const updated = value.includes(option)
            ? value.filter(o => o !== option)
            : [...value, option];
        onChange(updated);
    };

    return (
        <fieldset style={{ containerType: "inline-size", border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend className={style.fieldLabel}>
                {label}
            </legend>
            <FormGroup className={style.formGroup}>
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
                            control={
                                <Checkbox
                                    checked={selected}
                                    className={style.hiddenCheckbox}
                                    sx={{ position: 'absolute' }}
                                />
                            }
                            label={
                                <>
                                    {marked && <Check fontSize="small" color="inherit"/>}
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
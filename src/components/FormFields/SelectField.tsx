import { forwardRef } from "react";
import { Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from './style.module.css';

interface Props {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const MenuProps = {
    PaperProps: {
        style: {
            borderRadius: '0.75rem',
            padding: '0.5rem 0',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '10px'
        },
    },
};

const CustomSelectIcon = forwardRef<SVGSVGElement>((props, ref) => (
    <ExpandMoreIcon
        {...props}
        ref={ref}
        style={{ color: '#bbbbbb' }}
        sx={{
            transition: 'transform 0.3s ease',
            '&.MuiSelect-iconOpen': {
                color: '#008297 !important',
            }
        }}
    />
));

export default function SelectField({ label, options, value = '', onChange, placeholder, disabled }: Props) {
    return (
        <fieldset style={{ border: 0, padding: 0, margin: 0, width: '100%' }}>
            <legend className={style.fieldLabel}>
                {label}
            </legend>
            <Select
                fullWidth
                displayEmpty
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                renderValue={selected => selected || placeholder}
                IconComponent={CustomSelectIcon}
                sx={{
                    '& legend': { display: 'none' },
                    '& .MuiOutlinedInput-notchedOutline': { top: 0 },
                    '&:not(.Mui-focused) .MuiSelect-select': { color: value ? 'black' : '#bbbbbb' },
                }}
                MenuProps={MenuProps}
            >
                {options.map(option => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                            padding: '0.5rem 1.5rem',
                            margin: '5px',
                            borderRadius: '2rem',
                            fontWeight: value === option ? 'bold' : 'normal',
                            '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </fieldset>
    );
}
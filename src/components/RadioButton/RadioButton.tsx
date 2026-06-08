import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';


export const BigRadioButton = styled(FormControlLabel)({
    padding: '1.5rem 2rem',
    margin: 0,
    border: '1px solid var(--primary)',
    borderRadius: '8px',
    justifyContent: 'center',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    '&:has(.Mui-checked)': {
        borderColor: 'black',
        backgroundColor: 'lightgray'
    },
    '& .MuiFormControlLabel-label': {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        flexDirection: 'column',
        textTransform: 'none',
    },
    '& .MuiRadio-root': {
        display: 'none',
    },
})

export const TemplateRadioButton = styled(FormControlLabel)(({ theme }) => ({
    margin: 0,
    border: '2px solid',
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: '12px',
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    transition: 'border-color 0.2s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
    '&:has(.Mui-checked)': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiFormControlLabel-label': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
    },
    '& .MuiRadio-root': {
        display: 'none',
    },
}));
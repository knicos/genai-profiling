import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';


export const BigRadioButton = styled(FormControlLabel)(() => ({
    display: 'inline-flex',
    padding: '15px 10px',
    margin: 0,
    minWidth: '64px',
    border: '1px solid rgba(0, 130, 151, 0.5)',
    borderRadius: '4px',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#008297',
    fontFamily: 'Andika, sans-serif',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 250ms, border-color 250ms, box-shadow 250ms',

    '&:has(.Mui-checked)': {
        backgroundColor: 'rgba(0, 130, 151, 0.04)',
        borderColor: '#008297',
    },

    '& .MuiFormControlLabel-label': {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        flexDirection: 'column',
        textTransform: 'none',
    },

    '&:hover': {
        backgroundColor: 'rgba(0, 130, 151, 0.04)',
        borderColor: '#008297',
    },

    '& .MuiRadio-root': {
        position: 'absolute',
        opacity: 0,
        width: '1px',
        height: '1px',
        margin: 0,
        padding: 0,
    },
}));

export const TemplateRadioButton = styled(FormControlLabel)(({ theme }) => ({
    margin: 0,
    border: '1px solid',
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: '12px',
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    transition: 'border-color 0.2s ease',
    userSelect: 'none',

    '&:hover': {
        borderColor: theme.palette.primary.main,
        filter: 'brightness(0.)',
    },

    '&:has(.Mui-checked)': {
        borderColor: theme.palette.primary.main,
    },

    '&:has(.MuiRadio-root:focus-visible)': {
        outline: `3px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
    },

    '& .MuiFormControlLabel-label': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
    },

    '& .MuiRadio-root': {
        position: 'absolute',
        opacity: 0,
        width: '1px',
        height: '1px',
        margin: 0,
        padding: 0,
    },
}));
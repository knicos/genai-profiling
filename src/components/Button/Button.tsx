import MButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Button as BButton } from '@genai-fi/base';

export const Button = BButton;

export const BigButton = styled(MButton)({
    flexDirection: 'column',
    padding: '1.5rem 2rem',
    gridAutoColumnsp: '10px',
    textTransform: 'none'
})
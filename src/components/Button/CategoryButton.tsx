import MButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import style from './style.module.css';

const Button = styled(MButton, {
    shouldForwardProp: (prop) => prop !== 'highlighted',
})<{ highlighted?: boolean }>(({ highlighted }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    maxWidth: '100px',
    width: '100%',
    height: '100%',
    maxHeight: '100px',
    textTransform: 'none',
    borderRadius: '10px',

    border: highlighted
        ? '3px solid var(--blue-green)'
        : '2px solid var(--border-grey)',

    boxShadow: highlighted
        ? '0px 0px 4px #19b1a8ad'
        : 'none',

    alignItems: 'center',
    overflow: 'hidden',
    '&:hover': {
        filter: 'brightness(0.90)'
    }
}));

interface Props {
    icon: React.ReactNode;
    label: string;
    background?: string;
    highlighted?: boolean;
    onClick: () => void;
}

export default function CategoryButton({ icon, label, background, onClick, highlighted = false }: Props) {
    return (
        <Button
            highlighted={highlighted}
            onClick={onClick}
        >
            <span
                className={style.iconArea}
                style={{ background: background }}
            >
                {icon}
            </span>
            <span className={style.label}>
                {label}
            </span>
        </Button>
    )
}
import { Box } from '@mui/material';
import style from './style.module.css';

interface Props {
    value: number;
}

export default function BasicBar({ value }: Props) {
    return (
        <Box className={style.basicChart}>
            <Box
                className={style.bar}
                sx={{ height: `${value}%` }}
            />
        </Box>
    );
}
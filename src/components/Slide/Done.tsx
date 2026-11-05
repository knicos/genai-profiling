import style from './style.module.css';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

interface Props {
    count: number;
    userCount: number;
}

export default function Done({ count, userCount }: Props) {
    return (
        <div className={style.doneContainer}>
            <CheckCircleOutlinedIcon
                fontSize="inherit"
                htmlColor={count === userCount ? 'var(--success)' : '#ddd'}
            />
            <span>
                { count } / { userCount }
            </span>
        </div>
    );
}

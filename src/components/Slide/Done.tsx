import style from './style.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
    count: number;
}

export default function Done({ count }: Props) {
    return (
        <div className={style.doneContainer}>
            <CheckCircleIcon
                fontSize="large"
                htmlColor={count === 0 ? '#03a916' : '#ddd'}
            />
        </div>
    );
}

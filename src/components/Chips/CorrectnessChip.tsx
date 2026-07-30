import style from './style.module.css';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

interface Props {
    correctness: 'correct' | 'medium' | 'incorrect';
}

export default function CorrectnessChip({ correctness } : Props){
    switch(correctness) {
        case 'correct':
            return (
                <span className={`${style.correctness} ${style.correct}`}>
                    <CheckRoundedIcon fontSize='inherit' sx={{ stroke: 'var(--success)', strokeLinecap: 'round', strokeWidth: 2 }}/>
                </span>
            )
        case 'medium':
            return (
                <span className={`${style.correctness} ${style.medium}`}>
                    <RemoveRoundedIcon fontSize='inherit' sx={{ stroke: 'var(--bg-colorful2)', strokeLinecap: 'round', strokeWidth: 2 }}/>
                </span>
            )
        case 'incorrect':
            return (
                <span className={`${style.correctness} ${style.incorrect}`}>
                    <CloseRoundedIcon fontSize='inherit' sx={{ stroke: 'var(--error)', strokeLinecap: 'round', strokeWidth: 2 }}/>
                </span>
            )
    }
}
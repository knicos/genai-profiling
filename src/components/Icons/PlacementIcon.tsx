import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import style from './style.module.css'

interface Props {
    type: 'best' | 'second' | 'third' | 'worst';
}

export default function PlacementIcon({ type }: Props) {
    switch (type) {
        case 'best':
            return (
                <span className={`${style.listIcon} ${style.best}`}>
                    <EmojiEventsOutlinedIcon fontSize="inherit" />
                </span>)
        case 'worst':
            return (
                <span className={`${style.listIcon} ${style.worst}`}>
                    <WarningAmberRoundedIcon fontSize="inherit" />
                </span>
            )
        case 'second':
        case 'third':
            return (
                <span className={style.listIcon}>
                    <WorkspacePremiumRoundedIcon fontSize="inherit" />
                </span>
            )
    }
}
import style from './style.module.css';
import MysteryProfileIcon from '../Icons/MysteryProfileIcon';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function MockProfile() {
    const { t } = useTranslation();

    return (
        <div className={style.profileTitle}>
            <div className={style.profileTop} />

            <div className={style.profileInfo}>
                <span className={style.profileIcon}>
                    <MysteryProfileIcon />
                </span>
                <div className={style.profileText}>
                    <span className={style.nameTag}>
                        {t("game.ending.profileTitle")}
                    </span>
                    <Typography variant="body2">
                        {t("game.ending.profileSubtitle")
                        }</Typography>
                </div>
            </div>

        </div>
    )
}
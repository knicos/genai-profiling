import { useTranslation } from 'react-i18next';
import style from './style.module.css'

interface Props {
    type: 'best' | 'second' | 'third' | 'worst';
}

export default function PlacementChip({ type } : Props) {
    const { t } = useTranslation();

    return (
        <span
            className={`
                        ${style.placementChip}
                        ${type === "best" ? style.best : ""}
                        ${type === "worst" ? style.worst : ""}
                    `}
        >
            {t(`game.ending.influentialClues.${type}`)}
        </span>
    )
}
import { Category } from '@genaipg/components/Question/types';
import style from './style.module.css';
import MysteryProfileIcon from '@genaipg/components/Icons/MysteryProfileIcon';
import { useTranslation } from 'react-i18next';
import { List, Typography } from '@mui/material';
import ActionItem from '@genaipg/components/List/ActionItem';

interface Props {
    categories: Category[];
    onSelectCategory?: (category: Category) => void;
}

export default function Overview({ categories, onSelectCategory }: Props) {
    const { t } = useTranslation();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <span className={style.icon}>
                    <MysteryProfileIcon />
                </span>
                <Typography variant='h6'>
                    {t('student.mysteryPerson')}
                </Typography>
                <Typography variant='body2'>
                    {t('student.solve')}
                </Typography>
            </div>
            <List>
                {categories.map((c, ix) => (
                    <ActionItem
                        key={ix}
                        label={c.category}
                        onSelect={() => onSelectCategory && onSelectCategory(c)}
                    />
                ))}
            </List>
        </div>
    )
}
import { Category } from '@genaipg/components/Question/types';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { List } from '@mui/material';
import CategoryItem from './CategoryItem';
import MockProfile from '@genaipg/components/Visuals/MockProfile';
import { Help } from '@genai-fi/base';



interface Props {
    categories: Category[];
    onSelectCategory?: (category: Category) => void;
    activeCategoriesIds?: number[];
}

export default function Overview({ categories, onSelectCategory, activeCategoriesIds }: Props) {
    const { t } = useTranslation();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <MockProfile />
            </div>
            <div className={style.infoSection}>
                <h2>
                    {t("workflow.profile")}
                </h2>
                <span>
                    <Help 
                        inplace 
                        style={{ marginLeft: '1px' }}
                        message={t("student.help")}
                    />
                </span>
            </div>
            <List className={style.list}>
                {categories.map((c, ix) => (
                    <CategoryItem
                        key={ix}
                        category={c}
                        onSelectCategory={() => onSelectCategory && onSelectCategory(c)}
                        highlighted={activeCategoriesIds?.includes(c.id)}
                    />
                ))}
            </List>
        </div>
    )
}
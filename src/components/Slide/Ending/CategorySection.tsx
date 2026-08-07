import { Box, ListItemButton, ListItemText } from '@mui/material';
import style from './style.module.css';
import { popularCategory } from '@genaipg/views/Teacher/userState';
import ChevronRight from "@mui/icons-material/ChevronRight";
import CorrectnessChip from '../../Chips/CorrectnessChip';
import Icon from '@genaipg/components/Icons/Icon';

interface Props {
    category: popularCategory;
    setOpen: (open: popularCategory) => void;
    revealed: boolean;
}


export default function CategorySection({ category, setOpen, revealed }: Props) {
    return (
        <ListItemButton
            className={style.categoryItem}
            onClick={() => setOpen(category)}
        >
            <Box className={`${style.categoryItemInner} ${ revealed ? style.revealed : ''}`}>
                <Box className={style.categoryItemTitle}>
                    <div className={style.categoryTitle}>
                        <span className={style.categoryIcon}>
                            <Icon icon={category.icon} />
                        </span>
                        <ListItemText
                            primary={category.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                    </div>
                    {revealed && (
                        <CorrectnessChip correctness={category.isCorrect} />
                    )}
                </Box>
                <ChevronRight fontSize='large'/>
            </Box>
        </ListItemButton>
    )
}

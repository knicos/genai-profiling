import CheckBox  from "@mui/icons-material/CheckBox";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckBoxOutlineBlank  from "@mui/icons-material/CheckBoxOutlineBlank";
import { ListItemButton, ListItemText } from "@mui/material";
import style from './style.module.css'

interface Props {
    label: string;
    answered?: boolean;
    onSelect?: () => void;
}

export default function ActionItem({ label, answered = false, onSelect }: Props) {
    return (
        <ListItemButton className={style.actionItem} onClick={onSelect}>
            {answered ? <CheckBox color="success" /> : <CheckBoxOutlineBlank htmlColor="inherit" />}
            <ListItemText 
                primary={label}
                sx={{ 
                    '& .MuiListItemText-primary': {
                        fontWeight: 'bold'
                    }
                }} 
            />
            <ChevronRight />
        </ListItemButton>
    )
}
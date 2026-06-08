import { ListItem, ListItemText } from "@mui/material";
import style from './style.module.css';

interface Props {
    label: string;
    children?: React.ReactNode;
}

export default function ListCard({ label, children } : Props) {
    return (
        <ListItem className={style.listItemCard}>
            <ListItemText  primary={label}/>
            {children}
        </ListItem>
    )
}
import { ListItem } from "@mui/material";
import style from "./style.module.css";

interface Props {
    children: React.ReactNode;
}

export default function QuestionCard({ children } : Props){
    return(
        <ListItem className={style.questionItem}>
            {children}
        </ListItem>
    )
}
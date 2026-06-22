import { Outlet } from "react-router-dom";
import style from './style.module.css';

export default function Session(){
    return(
        <div className={style.container}>
            <Outlet />
        </div>
    )
}
import { Outlet } from "react-router";
import style from './style.module.css';

export default function Session(){
    return(
        <div className={style.container}>
            <Outlet />
        </div>
    )
}
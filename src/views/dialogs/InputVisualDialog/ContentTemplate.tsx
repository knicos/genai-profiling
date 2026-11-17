import { DialogContent } from "@mui/material";
import React from "react";
import style from './style.module.css'

interface Props {
    label: string;
    subtitle?: string;
    step: number;
    children: React.ReactNode;
}

export function ContentTemplate({ label, subtitle, step, children } : Props){
    return(
        <DialogContent className={style.dialogContent}>
            <div className={style.stepHeader}>
                <span className={style.stepBadge}>
                    {step}
                </span>
                <div>
                    <h5>{label}</h5>
                    <p>{subtitle}</p>
                </div>
            </div>
            {children}
        </DialogContent>
    )
}
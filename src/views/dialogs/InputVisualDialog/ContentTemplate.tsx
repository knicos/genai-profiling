import { DialogContent, Typography } from "@mui/material";
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
                    <Typography variant="h5" fontWeight="bold">
                        {label}
                    </Typography>
                    <Typography variant="subtitle2">{subtitle}</Typography>
                </div>
            </div>
            {children}
        </DialogContent>
    )
}
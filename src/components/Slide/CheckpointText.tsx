import style from './style.module.css';

interface Props {
    color: string;
    label: string;
    alignment?: string;
    children: React.ReactNode;
}

export default function CheckpointText({color, label, children, alignment} : Props) {
    return(
        <div className={style.textSection} style={{ alignItems: alignment }}>
            <span className={style.label} style={{color: `${color}`}}>
                {label}
            </span>
            {children}
        </div>
    )
}
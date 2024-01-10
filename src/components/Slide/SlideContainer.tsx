import style from './style.module.css';
import { PropsWithChildren } from 'react';

export default function SlideContainer({ children }: PropsWithChildren) {
    return <div className={style.slide}>{children}</div>;
}

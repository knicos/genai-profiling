import { SlideDemo} from './types';
import style from './style.module.css';
import Visuals from './Visuals';
import PhoneFrame from '@genaipg/components/Templates/PhoneFrame';

interface Props {
    meta: SlideDemo;
}

export default function DemoSlide({ meta }: Props) {

    return (
        <div className={style.image}>
            <div className={style.phoneFrame}>
                <PhoneFrame>
                    <Visuals  visual={meta.clue.visual}/>
                </PhoneFrame>
            </div>
            {meta.clue.clue && <h2>{meta.clue.clue}</h2>}
        </div>
    );
}

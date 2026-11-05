import { TemplateData } from "@genaipg/components/Templates/types";
import { SlideImage } from "@genaipg/components/Slide/types";
import Template from "../Templates/Template";
import { getImage } from "@genaipg/services/images/images";
import style from './style.module.css';

interface Props {
    visual?: TemplateData | SlideImage;
}

export default function Visuals({ visual }: Props) {
    if (!visual) return null;

    switch (visual.type) {
        case 'image':
            return (
                <div
                    className={style.imageContainer}
                    style={{
                        background: visual.url ? 'none' : 'var(--bg-dark3)'
                    }}
                >
                    {visual.url &&
                        <img
                            style={{
                                background: visual.url ? '' : 'black'
                            }}
                            className={style.imageContainer}
                            src={getImage(visual.url)}
                            alt={visual.label || ''}
                        />}
                </div>

            );
        default:
            return <Template template={visual} />;
    }
}
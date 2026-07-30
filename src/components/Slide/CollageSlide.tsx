import style from './style.module.css';
import Visuals from './Visuals';
import PhoneFrame from '@genaipg/components/Templates/PhoneFrame';
import { useAtomValue } from 'jotai';
import { profileAtom } from '@genaipg/state/profileState';
import { useTranslation } from 'react-i18next';

export default function CollageSlide() {
    const { t } = useTranslation();
    const profile = useAtomValue(profileAtom);
    const clues = profile?.slides.filter((slide) => slide.type === "demo") ?? [];

    return (
        <div className={style.image}>
            <div className={style.collage}>
                {clues.map((clue, ix) => (
                    <div
                        key={ix}
                        style={{
                            aspectRatio: '1 / 2',
                            borderRadius: '18px',
                            position: 'relative',
                        }}
                    >
                        <PhoneFrame>
                            <Visuals visual={clue.clue.visual} />
                        </PhoneFrame>
                    </div>
                ))}
            </div>
            <h2>
                {t('game.ending.collageTitle')}
            </h2>
        </div>
    );
}

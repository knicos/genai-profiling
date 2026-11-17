import style from './style.module.css';
import ErrorDialog from '../dialogs/ErrorDialog/ErrorDialog';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { HomeBanner, LangSelect } from '@genai-fi/base';
import { Button } from '@genai-fi/base/components/Button';
import { LANGS } from '@genaipg/components/LangSelect/langs';


export function Component() {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const doKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                navigate(`/individual/${value}`);
            }
        },
        [navigate]
    );

    const doGo = useCallback(() => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            navigate(`/individual/${value}`);
        }
    }, [navigate]);


    return (
        <div className={style.container}>
            <div className={style.language}>
                <LangSelect 
                    languages={LANGS}
                />
            </div>
            <HomeBanner
                title={
                    <span className={style.headerText}>
                        {t('app.appTitle')}
                    </span>
                }
                subtitle={
                    <span className={style.headerText}>
                        {t('app.appSubtitle')}
                    </span>
                }
                logoUrl="/logo192.png"
                githubUrl="https://github.com/knicos/genai-profiling"
                teachingMaterialsUrl="https://gen-ai.fi/en/materials/somekone-lesson-1-2"
                githubLabel={t("start.github")}
                teachingMaterialsLabel={t("start.teachingMaterials")}
            />
            <div className={style.innerContainer}>
                <Button
                    variant="outlined"
                    href="/game/configure"
                    className={style.createButton}
                    fullWidth
                >
                    {t("start.startSession")}
                </Button>
                <Button
                    variant="outlined"
                    href="/create"
                    className={style.createButton}
                    fullWidth
                >
                    {t("start.createNew")}
                </Button>
                <div className={style.or}>{t('start.labels.or')}</div>
                <TextField
                    label={t("start.existingPin")}
                    onKeyDown={doKeyDown}
                    fullWidth
                    className={style.textbox}
                    inputRef={inputRef}
                />
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={doGo}
                >
                    {t("start.go")}
                </Button>
                
                
                <ErrorDialog />
            </div>
        </div>
    );
}

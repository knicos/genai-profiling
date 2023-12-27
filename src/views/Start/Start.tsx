import style from './style.module.css';
//import ErrorDialog from '../dialogs/ErrorDialog/ErrorDialog';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';

export function Component() {
    const { t } = useTranslation();
    return (
        <div className={style.container}>
            <div className={style.innerContainer}>
                <img
                    src="/logo192_bw.png"
                    alt="GenAI logo"
                    width={192}
                    height={192}
                />
                <TextField
                    label={t('Enter Code')}
                    //  onKeyDown={doKeyDown}
                    fullWidth
                    className={style.textbox}
                    //  inputRef={inputRef}
                />
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    component="a"
                    //  onClick={doGo}
                >
                    {t('Go')}
                </Button>
                <div className={style.spacer} />
                <Button
                    variant="outlined"
                    href="/dashboard"
                    className={style.createButton}
                >
                    {t('Create New')}
                </Button>
                {/* <ErrorDialog /> */}
            </div>
        </div>
    );
}

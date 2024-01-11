import style from './style.module.css';
import ErrorDialog from '../dialogs/ErrorDialog/ErrorDialog';
// import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function Component() {
    // const { t } = useTranslation();
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
            <div className={style.innerContainer}>
                <img
                    src="/logo192_bw.png"
                    alt="GenAI logo"
                    width={192}
                    height={192}
                />
                <TextField
                    label="Enter Code  "
                    onKeyDown={doKeyDown}
                    fullWidth
                    className={style.textbox}
                    inputRef={inputRef}
                />
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    component="a"
                    onClick={doGo}
                >
                    Go
                </Button>
                <div className={style.spacer} />
                <Button
                    variant="outlined"
                    href="/configure"
                    className={style.createButton}
                >
                    Create New
                </Button>
                <ErrorDialog />
            </div>
        </div>
    );
}

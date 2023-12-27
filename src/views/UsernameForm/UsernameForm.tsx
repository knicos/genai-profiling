import { SmallButton } from '@genaism/components/Button/Button';
import { TextField } from '@mui/material';
import { useCallback, useRef } from 'react';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

const UsernameForm: React.FC = () => {
    const ref = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const handleInputChange = useCallback(() => {}, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Username submitted:', ref.current?.value);
    }, []);

    return (
        <div className={style.page}>
            <div className={style.userContainer}>
                <img
                    src="/logo192_bw.png"
                    alt="GenAI logo"
                    width={150}
                    height={150}
                />
                <form onSubmit={handleSubmit}>
                    <TextField
                        inputRef={ref}
                        label={t('Enter Username')}
                        onChange={handleInputChange}
                    />
                    <SmallButton
                        type="submit"
                        variant="contained"
                    >
                        {t('Enter')}
                    </SmallButton>
                </form>
            </div>
        </div>
    );
};

export default UsernameForm;

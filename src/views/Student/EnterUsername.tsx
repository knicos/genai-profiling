import { SmallButton } from '@genaipg/components/Button/Button';
import { TextField } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
    onUsername: (name: string) => void;
}

interface FormErrors {
    username?: 'missing' | 'bad';
    fullname?: 'missing' | 'bad';
}

export default function EnterUsername({ onUsername }: Props) {
    const { t } = useTranslation();
    const ref = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const doUsernameKey = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            setErrors((old) => ({ ...old, username: undefined }));
            if (e.key === 'Enter') {
                const name = (e.target as HTMLInputElement).value;
                onUsername(name);
            }
        },
        [onUsername]
    );

    return (
        <div className={style.page}>
            <div className={style.userContainer}>
                <TextField
                    inputRef={ref}
                    label={t('Enter Username')}
                    onKeyDown={doUsernameKey}
                    required
                    error={!!errors.username}
                    helperText={errors.username ? t(`feed.messages.usernameError.${errors.username}`) : undefined}
                />
                <SmallButton
                    onClick={() => {
                        if (ref.current) {
                            if (!ref.current.value) {
                                setErrors({ username: 'missing' });
                                return;
                            }
                            onUsername(ref.current.value);
                        }
                    }}
                    variant="contained"
                >
                    {t('Enter')}
                </SmallButton>
            </div>
        </div>
    );
}

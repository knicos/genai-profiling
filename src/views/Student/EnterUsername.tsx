import { LargeButton } from '@genai-fi/base/components/Button';
import { IconButton, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { availableUsers } from '@genaipg/state/sessionState';
import RestoreIcon from '@mui/icons-material/Restore';
import { LangSelect } from '@genai-fi/base';
import { LANGS } from '@genaipg/components/LangSelect/langs';

interface Props {
    onUsername: (name: string) => void;
    onChangeId?: (id: string) => void;
}

interface FormErrors {
    username?: 'missing' | 'bad';
    fullname?: 'missing' | 'bad';
}

export default function EnterUsername({ onUsername, onChangeId }: Props) {
    const { t } = useTranslation();
    const ref = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const users = useAtomValue(availableUsers);
    const [showRestore, setShowRestore] = useState(false);

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

    const doSelect = useCallback(
        (e: SelectChangeEvent) => {
            const id = e.target.value;
            if (onChangeId) onChangeId(id);
            const item = Array.from(users).find((u) => u.id === id);
            if (item) {
                onUsername(item.name);
            }
        },
        [onUsername, users, onChangeId]
    );

    return (
        <div className={style.page}>
            <div className={style.language}>
                <LangSelect
                    languages={LANGS}
                />
            </div>
            <div className={style.userContainer}>
                <TextField
                    inputRef={ref}
                    label={t('enterUsername')}
                    onKeyDown={doUsernameKey}
                    required
                    error={!!errors.username}
                    helperText={errors.username ? t(`feed.messages.usernameError.${errors.username}`) : undefined}
                />
                <LargeButton
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
                    {t('enter')}
                </LargeButton>
                {!showRestore && (
                    <div>
                        <IconButton onClick={() => setShowRestore(true)}>
                            <RestoreIcon />
                        </IconButton>
                    </div>
                )}
                {showRestore && (
                    <Select
                        value=""
                        onChange={doSelect}
                    >
                        {Array.from(users).map((u) => (
                            <MenuItem
                                key={u.id}
                                value={u.id}
                            >
                                {u.name}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </div>
        </div>
    );
}

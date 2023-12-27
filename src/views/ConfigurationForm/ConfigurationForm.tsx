import { useState, ChangeEvent, FormEvent } from 'react';
import { SmallButton } from '@genaism/components/Button/Button';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

export default function ConfigurationForm() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        className: '',
        sessionDetail: '',
        enableRecordings: false,
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className={style.page}>
            <form
                className={style.userContainer}
                onSubmit={handleSubmit}
            >
                {' '}
                <img
                    src="/logo192_bw.png"
                    alt="GenAI logo"
                    width={150}
                    height={150}
                />
                <TextField
                    label={t('Enter Class Name')}
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                />
                <TextField
                    label={t('Enter Session Detail')}
                    name="sessionDetail"
                    value={formData.sessionDetail}
                    onChange={handleInputChange}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="enableRecordings"
                            checked={formData.enableRecordings}
                            onChange={handleInputChange}
                        />
                    }
                    label={t('Enable Recordings')}
                />
                <SmallButton
                    type="submit"
                    variant="contained"
                >
                    {t('Configure')}
                </SmallButton>
            </form>
        </div>
    );
}

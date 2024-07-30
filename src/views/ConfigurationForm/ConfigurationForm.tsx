import { useState, ChangeEvent, FormEvent } from 'react';
import { LargeButton } from '@knicos/genai-base';
import { TextField } from '@mui/material';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LangSelect from '@genaipg/components/LangSelect/LangSelect';

export default function ConfigurationForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        className: '',
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
        navigate(`/classroom/smwk1?name=${formData.className}&audio=${formData.enableRecordings ? '1' : '0'}`);
    };

    return (
        <div className={style.page}>
            <form
                className={style.userContainer}
                onSubmit={handleSubmit}
            >
                <TextField
                    label={t('Enter Class Name')}
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                />
                <LangSelect />
                <LargeButton
                    type="submit"
                    variant="contained"
                >
                    {t('Go')}
                </LargeButton>
            </form>
        </div>
    );
}

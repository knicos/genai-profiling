import { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { LargeButton } from '@knicos/genai-base';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LangSelect from '@genaipg/components/LangSelect/LangSelect';
import { Manifest } from '@genaipg/components/ProfileLoader/types';

const MANIFEST_URL = 'https://store.gen-ai.fi/classroom/manifest.json';

export default function ConfigurationForm() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        className: '',
        enableRecordings: false,
    });
    const [manifest, setManifest] = useState<Manifest>();
    const [profile, setProfile] = useState<string>('');

    useEffect(() => {
        fetch(MANIFEST_URL).then((response) => {
            response.json().then((m) => setManifest(m));
        });
    }, []);

    const lang = i18n.language?.split('-')[0];
    const profiles = Object.keys(manifest?.profiles[lang] || {});

    useEffect(() => {
        setProfile('');
    }, [lang]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(
            `/classroom/${profile}/${lang}?name=${formData.className}&audio=${formData.enableRecordings ? '1' : '0'}`
        );
    };

    const doChangeProfile = useCallback((e: SelectChangeEvent) => {
        setProfile(e.target.value);
    }, []);

    console.log(profile, manifest);

    return (
        <div className={style.page}>
            <form
                className={style.userContainer}
                onSubmit={handleSubmit}
            >
                <LangSelect />
                <TextField
                    label={t('Enter Class Name')}
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                />
                <Select
                    required
                    displayEmpty
                    value={profile}
                    onChange={doChangeProfile}
                    variant="outlined"
                    data-testid="select-profile"
                    inputProps={{ 'aria-label': t('app.profile') }}
                >
                    <MenuItem
                        disabled
                        value=""
                    >
                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{t('app.selectProfile')}</span>
                    </MenuItem>
                    {profiles.map((p) => (
                        <MenuItem
                            key={p}
                            value={p}
                        >
                            {manifest?.profiles[lang]?.[p]?.name || 'No name'}
                        </MenuItem>
                    ))}
                </Select>
                <LargeButton
                    type="submit"
                    variant="contained"
                    disabled={profile === '' || !manifest}
                >
                    {t('Go')}
                </LargeButton>
            </form>
        </div>
    );
}

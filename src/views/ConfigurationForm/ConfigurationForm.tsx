import { useState, ChangeEvent, FormEvent, useEffect, useCallback, useRef } from 'react';
import { LargeButton } from '@genai-fi/base/components/Button';
import { MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LangSelect from '@genaipg/components/LangSelect/LangSelect';
import { Manifest } from '@genaipg/components/ContentLoaders/types';
import { useAtom } from 'jotai';
import { profileURLAtom } from '@genaipg/state/profileState';

const MANIFEST_URL = 'https://store.gen-ai.fi/classroom/manifest.json';
const LOCAL_PROFILE_KEY = 'custom';

export default function ConfigurationForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        className: '',
        enableRecordings: false,
    });
    const [manifest, setManifest] = useState<Manifest>();
    const [profile, setProfile] = useState<string>('');
    const [profileURL, setProfileURL] = useAtom(profileURLAtom);

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
            `/game/classroom/${profile}/${lang}?name=${formData.className}&audio=${formData.enableRecordings ? '1' : '0'}`
        );
    };

    const doChangeProfile = useCallback((e: SelectChangeEvent) => {
        setProfile(e.target.value);
    }, []);

    const handleProfileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (profileURL?.startsWith('blob:')) {
            URL.revokeObjectURL(profileURL);
        }

        const url = URL.createObjectURL(file);
        setProfileURL(url);
        setProfile(LOCAL_PROFILE_KEY);
        event.target.value = '';
    };

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
                <Typography variant="body1" style={{ marginTop: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem'   }}>
                    Or
                </Typography>
                 <input type="file" accept=".zip" ref={fileInputRef} style={{ display: 'none' }} onChange={handleProfileUpload} />
                <LargeButton
                    variant="outlined"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload custom profile
                </LargeButton>
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

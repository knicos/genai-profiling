import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng);
});

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)

    .init({
        fallbackLng: 'en-GB',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: ['en-GB', 'fi-FI'],
    });

export default i18n;

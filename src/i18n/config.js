import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import km from './locales/km.json';


export const defaultLanguage = process.env.REACT_APP_MAIN_LANGUAGE

export const defaultNamespace = 'default'

export const resources = {
    'en': {
        [defaultNamespace]: en
    },
    'km': {
        [defaultNamespace]: km
    }
}

i18n.use(initReactI18next).init({
    defaultNS: defaultNamespace,
    ns: [defaultNamespace],
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false
    }
})

export { i18n }
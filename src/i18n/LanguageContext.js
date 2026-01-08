import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, Translations } from './translations';
const LanguageContext = createContext(undefined);
const LANGUAGE_STORAGE_KEY = 'wealthtracker_language';
// Get browser language
const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'az' || browserLang === 'en' || browserLang === 'tr' || browserLang === 'ru') {
        return browserLang;
    }
    return 'az'; // Default to Azerbaijani
};
export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setLanguageState] = useState(() => {
        // Get saved language from localStorage
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved === 'az' || saved === 'en' || saved === 'tr' || saved === 'ru') {
            return saved;
        }
        // Try to detect browser language
        return getBrowserLanguage();
    });
    const changeLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    };
    useEffect(() => {
        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);
    const t = translations[currentLanguage];
    return (_jsx(LanguageContext.Provider, { value: {
            currentLanguage,
            changeLanguage,
            t,
            // Alias for backward compatibility
            language: currentLanguage,
            setLanguage: changeLanguage,
        }, children: children }));
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

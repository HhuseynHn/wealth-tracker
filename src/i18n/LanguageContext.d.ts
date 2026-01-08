import { ReactNode } from 'react';
import { Language, Translations } from './translations';
interface LanguageContextType {
    currentLanguage: Language;
    changeLanguage: (lang: Language) => void;
    t: Translations;
    language: Language;
    setLanguage: (lang: Language) => void;
}
export declare const LanguageProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useLanguage: () => LanguageContextType;
export {};
//# sourceMappingURL=LanguageContext.d.ts.map
// Currency definitions
export const CURRENCIES = [
    { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', nameAz: 'Azərbaycan Manatı' },
    { code: 'USD', symbol: '$', name: 'US Dollar', nameAz: 'ABŞ Dolları' },
    { code: 'EUR', symbol: '€', name: 'Euro', nameAz: 'Avro' },
    { code: 'GBP', symbol: '£', name: 'British Pound', nameAz: 'Britaniya Funtu' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira', nameAz: 'Türk Lirəsi' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', nameAz: 'Rus Rublu' },
];
// Default settings
export const DEFAULT_SETTINGS = {
    language: 'az',
    currency: 'AZN',
    theme: 'light',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'comma',
    notifications: {
        email: true,
        push: true,
        transactions: true,
        goals: true,
        crypto: true,
        marketing: false,
    },
};

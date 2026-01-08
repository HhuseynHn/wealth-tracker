// Category definitions
export const CATEGORIES = [
    { id: 'salary', nameAz: 'Maaş', nameEn: 'Salary', icon: '💰', color: '#10b981' },
    { id: 'investment', nameAz: 'İnvestisiya', nameEn: 'Investment', icon: '📈', color: '#3b82f6' },
    { id: 'food', nameAz: 'Qida', nameEn: 'Food', icon: '🍔', color: '#f59e0b' },
    { id: 'transport', nameAz: 'Nəqliyyat', nameEn: 'Transport', icon: '🚗', color: '#8b5cf6' },
    { id: 'shopping', nameAz: 'Alış-veriş', nameEn: 'Shopping', icon: '🛒', color: '#ec4899' },
    { id: 'entertainment', nameAz: 'Əyləncə', nameEn: 'Entertainment', icon: '🎬', color: '#06b6d4' },
    { id: 'health', nameAz: 'Sağlamlıq', nameEn: 'Health', icon: '🏥', color: '#ef4444' },
    { id: 'utilities', nameAz: 'Kommunal', nameEn: 'Utilities', icon: '💡', color: '#f97316' },
    { id: 'rent', nameAz: 'Kirayə', nameEn: 'Rent', icon: '🏠', color: '#6366f1' },
    { id: 'other', nameAz: 'Digər', nameEn: 'Other', icon: '📦', color: '#64748b' },
];
// Helper function to get category info
export const getCategoryInfo = (categoryId) => {
    return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];
};

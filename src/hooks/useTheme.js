import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTheme, toggleTheme } from '../store/themeSlice';
import { Theme } from '../types/settings';
export const useTheme = () => {
    const dispatch = useAppDispatch();
    const { theme, resolvedTheme } = useAppSelector((state) => state.theme);
    const isDark = resolvedTheme === 'dark';
    // Chart colors for Recharts
    const chartColors = {
        grid: isDark ? '#374151' : '#e2e8f0',
        text: isDark ? '#9ca3af' : '#64748b',
        tooltipBg: isDark ? '#1f2937' : '#ffffff',
        tooltipBorder: isDark ? '#374151' : '#e2e8f0',
        tooltipText: isDark ? '#f9fafb' : '#1f2937',
    };
    const changeTheme = (newTheme) => {
        dispatch(setTheme(newTheme));
    };
    const toggle = () => {
        dispatch(toggleTheme());
    };
    return {
        theme,
        resolvedTheme,
        isDark,
        chartColors,
        setTheme: changeTheme,
        toggleTheme: toggle,
    };
};

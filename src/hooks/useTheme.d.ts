import { Theme } from '../types/settings';
export declare const useTheme: () => {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    isDark: boolean;
    chartColors: {
        grid: string;
        text: string;
        tooltipBg: string;
        tooltipBorder: string;
        tooltipText: string;
    };
    setTheme: (newTheme: Theme) => void;
    toggleTheme: () => void;
};
//# sourceMappingURL=useTheme.d.ts.map
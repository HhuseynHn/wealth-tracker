import type { SettingsState, AppSettings, UserProfile, Theme, Currency, DateFormat, NumberFormat } from '../types/settings';
export declare const updateProfile: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<UserProfile>, "settings/updateProfile">, setProfile: import("@reduxjs/toolkit").ActionCreatorWithPayload<UserProfile, "settings/setProfile">, clearProfile: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"settings/clearProfile">, updateSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<AppSettings>, "settings/updateSettings">, setTheme: import("@reduxjs/toolkit").ActionCreatorWithPayload<Theme, "settings/setTheme">, setLanguage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "settings/setLanguage">, setCurrency: import("@reduxjs/toolkit").ActionCreatorWithPayload<Currency, "settings/setCurrency">, setDateFormat: import("@reduxjs/toolkit").ActionCreatorWithPayload<DateFormat, "settings/setDateFormat">, setNumberFormat: import("@reduxjs/toolkit").ActionCreatorWithPayload<NumberFormat, "settings/setNumberFormat">, updateNotificationSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<{
    email: boolean;
    push: boolean;
    transactions: boolean;
    goals: boolean;
    crypto: boolean;
    marketing: boolean;
}>, "settings/updateNotificationSettings">, resetSettings: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"settings/resetSettings">;
declare const _default: import("redux").Reducer<SettingsState>;
export default _default;
//# sourceMappingURL=settingsSlice.d.ts.map
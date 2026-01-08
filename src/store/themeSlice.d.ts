import type { Theme } from "../types/settings";
interface ThemeState {
    theme: Theme;
    resolvedTheme: "light" | "dark";
}
export declare const setTheme: import("@reduxjs/toolkit").ActionCreatorWithPayload<Theme, "theme/setTheme">, toggleTheme: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"theme/toggleTheme">, syncWithSystem: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"theme/syncWithSystem">;
declare const _default: import("redux").Reducer<ThemeState>;
export default _default;
//# sourceMappingURL=themeSlice.d.ts.map
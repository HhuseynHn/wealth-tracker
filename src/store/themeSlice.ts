// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Theme } from "../types/settings";
// import { useEffect } from "react";
// import { useAppSelector } from "./hooks";

// interface ThemeState {
//   theme: Theme;
//   resolvedTheme: "light" | "dark";
// }

// // Get system theme
// const getSystemTheme = (): "light" | "dark" => {
//   if (typeof window !== "undefined" && window.matchMedia) {
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   }
//   return "light";
// };

// // Load theme from localStorage
// const loadTheme = (): Theme => {
//   try {
//     const stored = localStorage.getItem("wt_theme");
    
//     if (stored && ["light", "dark", "system"].includes(stored)) {
//       return stored as Theme;
//     }
//   } catch (error) {
//     console.error("Failed to load theme:", error);
//   }
//   return "light";
// };

// // Save theme to localStorage
// // const saveTheme = (theme: Theme) => {
// //   try {
// //     localStorage.setItem("wt_theme", theme);
// //   } catch (error) {
// //     console.error("Failed to save theme:", error);
// //   }
// // };

// // Resolve theme
// const resolveTheme = (theme: Theme): "light" | "dark" => {
//   if (theme === "system") {
//     return getSystemTheme();
//   }
//   return theme;
// };

// // Apply theme to DOM
// // const applyTheme = (resolvedTheme: "light" | "dark") => {
  
// //   if (typeof document !== "undefined") {
// //     const html = document.documentElement;
// //     html.classList.remove("light", "dark");
// //     html.classList.add(resolvedTheme);
    
// //     // Also set data attribute for Tailwind
// //     html.setAttribute("data-theme", resolvedTheme);
// //   }
// // };
// //--------------------------

// const ThemeEffect = () => {
//   const { theme, resolvedTheme } = useAppSelector(state => state.theme)

//   useEffect(() => {
//     const html = document.documentElement
//     html.classList.remove("dark")
//     if (resolvedTheme === "dark") {
//       html.classList.add("dark")
//     }
//     localStorage.setItem("wt_theme", theme)
//   }, [theme, resolvedTheme])

//   return null
// }


// //--------------------------

// const storedTheme = loadTheme();
// const resolved = resolveTheme(storedTheme);

// // Apply theme on initial load
// // applyTheme(resolved);

// const initialState: ThemeState = {
//   theme: storedTheme,
//   resolvedTheme: resolved,
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     setTheme: (state, action: PayloadAction<Theme>) => {
//       state.theme = action.payload;
//       state.resolvedTheme = resolveTheme(action.payload);
//       // saveTheme(action.payload);
//       // applyTheme(state.resolvedTheme);
//     },

//     toggleTheme: (state) => {
//       const newTheme = state.resolvedTheme === "light" ? "dark" : "light";
//       state.theme = newTheme;
//       state.resolvedTheme = newTheme;
//       // saveTheme(newTheme);
//       // applyTheme(newTheme);
//     },

//     syncWithSystem: (state) => {
//       if (state.theme === "system") {
//         state.resolvedTheme = getSystemTheme();
//         // applyTheme(state.resolvedTheme);
//       }
//     },
//   },
// });

// export const { setTheme, toggleTheme, syncWithSystem } = themeSlice.actions;

// export default themeSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Theme } from "../types/settings"

interface ThemeState {
  theme: Theme
    resolvedTheme: "light" | "dark"
}

// system theme
const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

const resolveTheme = (theme: Theme): "light" | "dark" =>
  theme === "system" ? getSystemTheme() : theme

const initialTheme = (localStorage.getItem("wt_theme") as Theme) || "light"
const initialResolvedTheme = resolveTheme(initialTheme)

// Apply theme to DOM on initial load (before React renders)
if (typeof document !== "undefined") {
  const html = document.documentElement
  html.classList.remove("light", "dark")
  
  // Only add dark class if initialResolvedTheme is 'dark', otherwise leave it without class (light mode)
  if (initialResolvedTheme === "dark") {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }
  
  html.setAttribute("data-theme", initialResolvedTheme)
}

const initialState: ThemeState = {
  theme: initialTheme,
  resolvedTheme: initialResolvedTheme,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      state.resolvedTheme = resolveTheme(action.payload)
    },

    toggleTheme: (state) => {
      // state.resolvedTheme = state.resolvedTheme === "dark" ? "light" : "dark"
      state.resolvedTheme = state.resolvedTheme === "dark" ? "light" : "dark"
      state.theme = state.resolvedTheme
    },

    syncWithSystem: (state) => {
      if (state.theme === "system") {
        state.resolvedTheme = getSystemTheme()
      }
    },
  },
})

export const { setTheme, toggleTheme, syncWithSystem } = themeSlice.actions
export default themeSlice.reducer

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { LanguageProvider } from "./i18n";
import { store } from "./store";
import { Dashboard, Goals, Investments, Notifications, Pricing, Profile, Reports, Transactions, Welcome } from "./pages";
import { LoginForm, ProtectedRoute, RegisterForm } from "./components/auth";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { syncWithSystem } from "./store/themeSlice";
import ThemeEffect from "./components/common/ThemeEffect";

const ThemeSync = () => {
    const dispatch = useAppDispatch();
    console.log("TemSync");
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => dispatch(syncWithSystem());
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [dispatch]);
    return null;
};
function App() {
    return (_jsx(_Fragment, { children: _jsx(Provider, { store: store, children: _jsxs(LanguageProvider, { children: [_jsx(ThemeSync, {}), _jsx(ThemeEffect, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Welcome, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginForm, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterForm, {}) }), _jsxs(Route, { element: _jsxs(ProtectedRoute, { children: [" ", _jsx(MainLayout, {}), " "] }), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/transactions", element: _jsx(Transactions, {}) }), _jsx(Route, { path: "/investments", element: _jsx(Investments, {}) }), _jsx(Route, { path: "/goals", element: _jsx(Goals, {}) }), _jsx(Route, { path: "/reports", element: _jsx(Reports, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/pricing", element: _jsx(Pricing, {}) }), _jsx(Route, { path: "/notifications", element: _jsx(Notifications, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) })] }) }) }));
}
export default App;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './transactionSlice';
import cryptoReducer from './cryptoSlice';
import goalReducer from './goalSlice';
import notificationReducer from './notificationSlice';
import settingsReducer from './settingsSlice';
import subscriptionReducer from './subscriptionSlice';
import themeReducer from './themeSlice';
import { cryptoApi } from './cryptoApi';
// Root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    transactions: transactionReducer,
    crypto: cryptoReducer,
    goals: goalReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
    subscription: subscriptionReducer,
    theme: themeReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
});
// Store configuration
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware),
});

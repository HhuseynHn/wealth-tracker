import { createSlice } from '@reduxjs/toolkit';
// Storage key
const CRYPTO_STORAGE_KEY = 'wealthtracker_crypto';
// Load from localStorage
const loadCryptoAssets = () => {
    try {
        const data = localStorage.getItem(CRYPTO_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    catch {
        return [];
    }
};
// Save to localStorage
const saveCryptoAssets = (assets) => {
    localStorage.setItem(CRYPTO_STORAGE_KEY, JSON.stringify(assets));
};
// Sample data
const getSampleCryptoAssets = () => [
    {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.5,
        purchasePrice: 42000,
        purchaseDate: '2024-01-15',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 2.5,
        purchasePrice: 2200,
        purchaseDate: '2024-02-20',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        symbol: 'SOL',
        name: 'Solana',
        amount: 10,
        purchasePrice: 95,
        purchaseDate: '2024-03-10',
        createdAt: new Date().toISOString(),
    },
];
// Initialize
const initializeCryptoAssets = () => {
    const stored = loadCryptoAssets();
    if (stored.length === 0) {
        const samples = getSampleCryptoAssets();
        saveCryptoAssets(samples);
        return samples;
    }
    return stored;
};
// Initial state
const initialState = {
    assets: initializeCryptoAssets(),
    isLoading: false,
    error: null,
};
// Crypto slice
const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        addCryptoAsset: (state, action) => {
            const newAsset = {
                id: Date.now().toString(),
                ...action.payload,
                createdAt: new Date().toISOString(),
            };
            state.assets.push(newAsset);
            saveCryptoAssets(state.assets);
        },
        updateCryptoAsset: (state, action) => {
            const index = state.assets.findIndex((a) => a.id === action.payload.id);
            if (index !== -1) {
                state.assets[index] = { ...state.assets[index], ...action.payload };
                saveCryptoAssets(state.assets);
            }
        },
        deleteCryptoAsset: (state, action) => {
            state.assets = state.assets.filter((a) => a.id !== action.payload);
            saveCryptoAssets(state.assets);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});
export const { addCryptoAsset, updateCryptoAsset, deleteCryptoAsset, setLoading, setError, } = cryptoSlice.actions;
export default cryptoSlice.reducer;
// Selectors
export const selectCryptoAssets = (state) => state.crypto.assets;
export const selectCryptoLoading = (state) => state.crypto.isLoading;

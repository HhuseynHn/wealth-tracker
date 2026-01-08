export interface CryptoAsset {
    id: string;
    symbol: string;
    name: string;
    amount: number;
    purchasePrice: number;
    purchaseDate: string;
    createdAt: string;
}
export interface MarketData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d_in_currency?: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    sparkline_in_7d?: {
        price: number[];
    };
}
export interface SimplePriceResponse {
    [key: string]: {
        usd: number;
        usd_24h_change: number;
    };
}
export interface PortfolioAsset extends CryptoAsset {
    currentPrice: number;
    currentValue: number;
    profitLoss: number;
    profitLossPercentage: number;
    priceChange24h: number;
}
export interface CryptoState {
    assets: CryptoAsset[];
    isLoading: boolean;
    error: string | null;
}
export interface AddCryptoDTO {
    symbol: string;
    name: string;
    amount: number;
    purchasePrice: number;
    purchaseDate: string;
}
export interface UpdateCryptoDTO {
    id: string;
    amount?: number;
    purchasePrice?: number;
}
export interface PortfolioStats {
    totalInvested: number;
    currentValue: number;
    totalProfitLoss: number;
    totalProfitLossPercentage: number;
    assetCount: number;
}
export declare const POPULAR_CRYPTOS: {
    id: string;
    symbol: string;
    name: string;
}[];
//# sourceMappingURL=crypto.d.ts.map
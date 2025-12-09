// Crypto Asset Interface
export interface CryptoAsset {
    id: string
    symbol: string
    name: string
    amount: number
    purchasePrice: number
    purchaseDate: string
    createdAt: string
  }
  
  // Market Data from API
  export interface MarketData {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    price_change_percentage_24h: number
    price_change_percentage_7d_in_currency?: number
    total_volume: number
    high_24h: number
    low_24h: number
    sparkline_in_7d?: {
      price: number[]
    }
  }
  
  // Simple Price Response
  export interface SimplePriceResponse {
    [key: string]: {
      usd: number
      usd_24h_change: number
    }
  }
  
  // Portfolio Asset with current data
  export interface PortfolioAsset extends CryptoAsset {
    currentPrice: number
    currentValue: number
    profitLoss: number
    profitLossPercentage: number
    priceChange24h: number
  }
  
  // Crypto State
  export interface CryptoState {
    assets: CryptoAsset[]
    isLoading: boolean
    error: string | null
  }
  
  // Add Crypto DTO
  export interface AddCryptoDTO {
    symbol: string
    name: string
    amount: number
    purchasePrice: number
    purchaseDate: string
  }
  
  // Update Crypto DTO
  export interface UpdateCryptoDTO {
    id: string
    amount?: number
    purchasePrice?: number
  }
  
  // Portfolio Stats
  export interface PortfolioStats {
    totalInvested: number
    currentValue: number
    totalProfitLoss: number
    totalProfitLossPercentage: number
    assetCount: number
  }
  
  // Popular Cryptos for quick add
  export const POPULAR_CRYPTOS = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { id: 'solana', symbol: 'SOL', name: 'Solana' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  ]
  
  
  
  
  
  
  
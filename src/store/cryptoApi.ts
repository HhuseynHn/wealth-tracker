import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MarketData, SimplePriceResponse } from '../types/crypto'

// CoinGecko API base URL
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: COINGECKO_BASE_URL }),
  tagTypes: ['MarketData', 'Price'],
  endpoints: (builder) => ({
    // Get market data for top cryptos
    getMarketData: builder.query<MarketData[], { limit?: number }>({
      query: ({ limit = 10 }) =>
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`,
      providesTags: ['MarketData'],
      // Refetch every 60 seconds
      keepUnusedDataFor: 60,
    }),

    // Get simple price for specific coins
    getSimplePrice: builder.query<SimplePriceResponse, string[]>({
      query: (ids) =>
        `/simple/price?ids=${ids.join(',')}&vs_currency=usd&include_24hr_change=true`,
      providesTags: ['Price'],
      keepUnusedDataFor: 30,
    }),

    // Get coin details
    getCoinDetails: builder.query<MarketData, string>({
      query: (id) =>
        `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
    }),

    // Search coins
    searchCoins: builder.query<{ coins: { id: string; symbol: string; name: string }[] }, string>({
      query: (query) => `/search?query=${query}`,
    }),
  }),
})

export const {
  useGetMarketDataQuery,
  useGetSimplePriceQuery,
  useGetCoinDetailsQuery,
  useSearchCoinsQuery,
} = cryptoApi





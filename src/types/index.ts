export type CurrencyType = 'Secondary' | 'Primary'

export interface ICurrencyItemApi {
  code: string
  ticker: string
  type: CurrencyType
  sort_order: number
  decimals_places: number
  icon: string
}

export type PriceChangeDirectionType = 'Down' | 'Up'

export interface IMarketItemApi {
  pair: {
    primary: string
    secondary: string
  }
  price: {
    last: string
    bestBid: string
    bestOffer: string
    change: {
      direction: PriceChangeDirectionType
      percent: string
      amount: string
    }
  }
  volume: {
    primary: string
    secondary: string
  }
  priceHistory: string[]
}

export interface ISecondaryCurrency {
  name: string
  ticker: string
}

export interface IMarketItem {
  icon: string
  name: string
  ticker: string
  price: number
  sortOrder: number
  changePercent: number
  changeDirection: PriceChangeDirectionType
  changeAmount: number
  volumePrimary: number
  volumeSecondary: number
  priceHistory: string[]
}

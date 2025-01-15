import { ICurrencyItemApi, IMarketItem, IMarketItemApi } from '../types'

const formatToDecimal = (input: string, decimalPlaces: number = 2): number => {
  return +parseFloat(input).toFixed(decimalPlaces)
}

export const dataMapper = (currencies: ICurrencyItemApi[], markets: IMarketItemApi[]): IMarketItem[] => {
  const result: IMarketItem[] = []

  currencies.forEach(currencyItem => {
    const market = markets.find(marketItem => currencyItem.code === marketItem.pair.primary)
    if (market) {
      result.push({
        icon: currencyItem.icon,
        name: currencyItem.code,
        ticker: currencyItem.ticker,
        price: formatToDecimal(market.price.last, currencyItem.decimals_places),
        sortOrder: currencyItem.sort_order,
        changeAmount: market.price.change.direction === 'Down' ? formatToDecimal(market.price.change.amount) * -1 : formatToDecimal(market.price.change.amount),
        changePercent: market.price.change.direction === 'Down' ? formatToDecimal(market.price.change.percent) * -1 : formatToDecimal(market.price.change.percent),
        changeDirection: market.price.change.direction,
        volumePrimary: formatToDecimal(market.volume.primary),
        volumeSecondary: formatToDecimal(market.volume.secondary),
        priceHistory: market.priceHistory
      })
    }
  })

  return result
}

import { CurrencyType, ICurrencyItemApi, ISecondaryCurrency } from '../types'

export const getCurrencies = (data: ICurrencyItemApi[], type: CurrencyType): ISecondaryCurrency[] => {
  const result: ISecondaryCurrency[] = []

  data.forEach((item) => {
    if (type === 'Secondary' && item.type === 'Secondary') {
      result.push({
        name: item.code,
        ticker: item.ticker
      })
    } else if (type === 'Primary' && item.type === 'Primary') {
      result.push({
        name: item.code,
        ticker: item.ticker
      })
    }
  })

  return result
}

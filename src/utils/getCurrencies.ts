import { ICurrencyItemApi, ISecondaryCurrency } from '../types'

export const getSecondaryCurrencies = (data: ICurrencyItemApi[]): ISecondaryCurrency[] => {
  const result: ISecondaryCurrency[] = []

  data.forEach((item) => {
    if (item.type === 'secondary') {
      result.push({
        name: item.code,
        ticker: item.ticker
      })
    }
  })

  return result
}

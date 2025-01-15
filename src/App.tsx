import React, { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'

import { TableHeader } from './components/table-header'
import { TableBody } from './components/table-body'
import { useFetchData } from './hooks/use-fetch-data'
import { getCurrencies } from './utils/getCurrencies'
import { ICurrencyItemApi, IMarketItem, IMarketItemApi, ISecondaryCurrency } from './types'
import { CURRENCY_URL, MARKET_URL } from './constants'
import { dataMapper } from './utils/dataMapper'

import styles from './App.module.css'
import { SearchBar } from './components/search-bar'

function App() {
  const { data: currenciesData, isLoading: isLoadingCurrency, error: currencyError } = useFetchData<ICurrencyItemApi[]>({
    url: CURRENCY_URL,
  })
  const { data: marketsData, isLoading: isLoadingMarket } = useFetchData<IMarketItemApi[]>({
    url: MARKET_URL,
    interval: 10000
  })
  const [secondaryCurrencies, setSecondaryCurrencies] = useState<ISecondaryCurrency[]>([])
  const [tableData, setTableData] = useState<IMarketItem[]>([])
  const [search, setSearch] = useState<string>('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    if (currenciesData) {
      const result = getCurrencies(currenciesData, 'Secondary')
      setSecondaryCurrencies(result)
    }
  }, [currenciesData])

  useEffect(() => {
    if (currenciesData && marketsData) {
      const result = dataMapper(currenciesData, marketsData)
      setTableData(result)
    }
  }, [currenciesData, marketsData])

  const filteredData = useMemo(() => {
    return tableData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, tableData])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    const key = sortKey as keyof IMarketItem
    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return sortDirection === 'asc' ? -1 : 1
      if (a[key] > b[key]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortKey, sortDirection])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  if (isLoadingCurrency) {
    return (
      <div className={styles.app}>
        <div className={styles.alert}><span>Loading ...</span></div>
      </div>
    )
  }

  if (currencyError) {
    return (
      <div className={styles.app}>
        <div className={styles.alert}><span>Error: {currencyError}<br/>Refresh the page please!</span></div>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <div>
      <div className={classnames(styles.wrapper, styles.headerWrapper)}>
        <SearchBar value={search} onChange={setSearch} />
        <select name="secondary" className={styles.select}>
          {secondaryCurrencies.map(item => {
            return <option key={item.name} value={item.ticker}>{item.name.toUpperCase()}</option>
          })}
        </select>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <TableHeader
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <TableBody data={sortedData} />
        </table>
      </div>
      </div>
    </div>
  )
}

export default App

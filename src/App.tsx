import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

import { TableHeader } from './components/table-header'
import { TableBody } from './components/table-body'
import { SearchBar } from './components/search-bar'
import { SelectCurrency } from './components/select-currency'
import { Loading } from './components/loading'
import { Error } from './components/error'
import { useFetchData } from './hooks/use-fetch-data'
import { getCurrencies } from './utils/getCurrencies'
import { dataMapper } from './utils/dataMapper'
import { ICurrencyItemApi, IMarketItem, IMarketItemApi, ISecondaryCurrency } from './types'
import { CURRENCY_URL, MARKET_URL } from './constants'

import styles from './App.module.css'
import global from './css/Global.module.css'

function App() {
  const {
    data: currenciesData,
    isLoading: isLoadingCurrency,
    error: currencyError
  } = useFetchData<ICurrencyItemApi[]>({
    url: CURRENCY_URL
  })
  const { data: marketsData } = useFetchData<IMarketItemApi[]>({
    url: MARKET_URL,
    interval: 10000
  })
  const [secondaryCurrencies, setSecondaryCurrencies] = useState<ISecondaryCurrency[]>([])
  const [selected, setSelected] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [tableData, setTableData] = useState<IMarketItem[]>([])
  const [filteredData, setFilteredData] = useState<IMarketItem[]>([]);
  const [sortedData, setSortedData] = useState<IMarketItem[]>([]);

  // getting secondary currencies for select
  useEffect(() => {
    if (currenciesData) {
      const result = getCurrencies(currenciesData, 'Secondary')
      setSecondaryCurrencies(result)
    }
  }, [currenciesData])

  // mapping fetched data for table
  useEffect(() => {
    if (currenciesData && marketsData) {
      const result = dataMapper(currenciesData, marketsData)
      setTableData(result)
    }
  }, [currenciesData, marketsData])

  // filtering table by search value
  useEffect(() => {
    const filtered = tableData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, tableData]);

  // sorting table by sort keys
  useEffect(() => {
    if (!sortKey) {
      setSortedData(filteredData);
      return;
    }

    const key = sortKey as keyof IMarketItem;
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return sortDirection === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  }, [filteredData, sortKey, sortDirection]);

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
      <div className={styles.container}>
        <Loading />
      </div>
    )
  }

  if (currencyError) {
    return (
      <div className={styles.container}>
        <Error errorMessage={currencyError} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={classnames(global.wrapper, global.headerWrapper)}>
          <SearchBar value={search} onChange={setSearch} />
          <SelectCurrency options={secondaryCurrencies} onChange={setSelected} value={selected} />
        </div>
        <div className={global.wrapper}>
          <table className={global.table}>
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

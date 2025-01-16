import React, { FC } from 'react'
import { ISecondaryCurrency } from '../../types'
import styles from './SelectCurrency.module.css'

interface ISelectCurrencyProps {
  options: ISecondaryCurrency[]
  onChange: (value: string) => void
  value: string
}

export const SelectCurrency: FC<ISelectCurrencyProps> = ({ options, onChange, value }) => {
  return (
    <select
      name="secondary"
      value={value}
      className={styles.select}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(item => {
        return <option key={item.name} value={item.ticker}>{item.name.toUpperCase()}</option>
      })}
    </select>
  )
}

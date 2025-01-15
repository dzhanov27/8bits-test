import React from 'react'
import classnames from 'classnames'

import { IMarketItem } from '../../types'

import styles from './TableBody.module.css'
import { convertWithCommas } from '../../utils/convertWithCommas'

interface ITableBodyProps {
  data: IMarketItem[]
}

export const TableBody: React.FC<ITableBodyProps> = ({ data }) => {
  return (
    <tbody> {
      data.map((item) => {
        return (
          <tr key={item.ticker} className={styles.tr}>
            <td className={styles.coinNameCell}>
                <span className={styles.coinName}>
                  {item.name.toUpperCase()}
                </span>
              <span className={styles.coinTicker}>{item.ticker}</span>
            </td>
            <td>
              $ {convertWithCommas(item.price)}
            </td>
            <td>
              <div className={styles.changeWrapper}>
                  <span
                    className={classnames({
                      [styles.changeUp]: item.changeDirection === 'Up',
                      [styles.changeDown]: item.changeDirection === 'Down'
                    })}>
                    {item.changeDirection === 'Up' && '+'}{item.changePercent}%
                  </span>
                <span
                  className={styles.changeAmount}>
                    {item.changeDirection === 'Up' && '+'}{convertWithCommas(item.changeAmount)}
                  </span>
              </div>
            </td>
            <td>
              $ {convertWithCommas(item.volumeSecondary)}
            </td>
            <td className={styles.buttonCell}>
              <div className={styles.buttonWrapper}>
                <button className={classnames(styles.button, styles.buttonPrimary)}>Buy</button>
                <button className={classnames(styles.button, styles.buttonSecondary)}>Sell</button>
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}

import React from 'react'
import classnames from 'classnames'

import styles from './TableHeader.module.css'

interface TableHeaderProps {
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ sortKey, sortDirection, onSort }) => {
  const headers = [
    { key: 'name', label: 'Coin' },
    { key: 'price', label: 'Price' },
    { key: 'changePercent', label: '24h Change' },
    { key: 'volumeSecondary', label: '24h Volume' }
  ]

  return (
    <thead>
    <tr>
      {headers.map((header) => (
        <th
          className={classnames(styles.th, { [styles.coinNameCell]: header.key === 'name' })}
          key={header.key}
          onClick={() => onSort(header.key)}
          style={{ cursor: 'pointer' }}
        >
          {header.label}{' '}
          <span
            className={classnames(
              styles.sortArrow,
              { [styles.selectedArrow]: sortKey === header.key }
            )}>
            {sortDirection === 'asc' && sortKey === header.key ? '↑' : '↓'}
          </span>
        </th>
      ))}
    </tr>
    </thead>
  )
}

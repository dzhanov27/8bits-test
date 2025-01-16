import React from 'react'
import styles from './SearchBar.module.css'

interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for coin"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

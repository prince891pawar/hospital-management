import { Search, X } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Search', label = 'Search', className = '' }) {
  return (
    <label className={`mf-search-input ${className}`}>
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {value && <button type="button" aria-label="Clear search" onClick={() => onChange('')}><X size={15} /></button>}
    </label>
  )
}
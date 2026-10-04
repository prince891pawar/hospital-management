import EmptyState from '../common/EmptyState.jsx'
import ErrorState from '../common/ErrorState.jsx'
import LoadingState from '../common/LoadingState.jsx'

export default function DataTable({ columns, rows, rowKey = 'id', loading = false, error = null, emptyTitle, emptyDescription, onRetry }) {
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (loading) return <LoadingState rows={4} />
  if (!rows.length) return <EmptyState title={emptyTitle} description={emptyDescription} />

  return (
    <div className="mf-table-scroll">
      <table className="mf-table">
        <thead><tr>{columns.map((column) => <th key={column.key || column.label} scope="col">{column.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row[rowKey] ?? rowIndex}>
              {columns.map((column) => <td key={column.key || column.label}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, total, onPageChange }) {
  const start = total ? (page - 1) * 10 + 1 : 0
  const end = Math.min(page * 10, total)
  return (
    <div className="mf-pagination">
      <span>Showing <strong>{start}–{end}</strong> of <strong>{total}</strong></span>
      <div className="mf-pagination-actions">
        <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeft size={15} />Previous</button>
        <span>Page {page} of {Math.max(totalPages, 1)}</span>
        <button type="button" aria-label="Next page" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next<ChevronRight size={15} /></button>
      </div>
    </div>
  )
}
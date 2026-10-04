export default function LoadingState({ rows = 4 }) {
  return (
    <div className="mf-loading-state" role="status" aria-label="Loading data">
      {Array.from({ length: rows }, (_, index) => <span className="mf-skeleton-row" key={index} />)}
    </div>
  )
}
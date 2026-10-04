import { Link } from 'react-router-dom'

export default function PlaceholderPage({ title }) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-content">
        <h1>{title}</h1>
        <p>This area is part of the MediFlow foundation and will be built in a later step.</p>
        <Link to="/">Return to home</Link>
      </div>
    </main>
  )
}
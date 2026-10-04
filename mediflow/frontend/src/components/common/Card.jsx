export default function Card({ children, className = '', ...props }) {
  return <section className={`mf-card ${className}`.trim()} {...props}>{children}</section>
}
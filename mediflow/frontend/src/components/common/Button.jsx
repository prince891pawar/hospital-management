import { Link } from 'react-router-dom'

const variants = {
  primary: 'mf-button-primary',
  secondary: 'mf-button-secondary',
  subtle: 'mf-button-subtle',
  danger: 'mf-button-danger',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  to,
  icon: Icon,
  iconAfter: IconAfter,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `mf-button ${variants[variant] || variants.primary} mf-button-${size} ${className}`.trim()
  const content = <>{Icon && <Icon size={16} aria-hidden="true" />}<span>{children}</span>{IconAfter && <IconAfter size={16} aria-hidden="true" />}</>

  if (to) return <Link className={classes} to={to} {...props}>{content}</Link>
  return <button className={classes} type={type} {...props}>{content}</button>
}
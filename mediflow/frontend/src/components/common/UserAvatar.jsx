export default function UserAvatar({ user, className = '' }) {
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}` || 'MF'
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'MediFlow user'

  return user?.profileImage
    ? <img className={`mf-avatar-image ${className}`.trim()} src={user.profileImage} alt={`${name} profile`} />
    : <span className={`mf-avatar ${className}`.trim()} aria-label={`${name} profile`}>{initials.toUpperCase()}</span>
}
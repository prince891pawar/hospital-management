export function toSafeUser(user) {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profileImage: user.profileImage || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
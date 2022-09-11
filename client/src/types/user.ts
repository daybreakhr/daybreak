import { User } from 'firebase/auth'
import { Role } from './member'

export type UserWithClaims = User & {
  role?: Role
}

import { UserInfo } from 'firebase/auth'

export type Role = 'admin' | 'member'

export type Member = UserInfo & Role

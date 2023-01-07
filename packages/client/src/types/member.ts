import { Role } from '@prisma/client'
import { UserInfo } from 'firebase/auth'

export type Member = UserInfo & {
  role: Role
  memberId: string
  isSuspended: boolean
}

export type MemberTableData = {
  rowId: string
  id?: string
  uid?: string
  email: string
  role: string
  displayName?: string
  photoURL?: string
  memberId: string
  isSuspended?: boolean
}

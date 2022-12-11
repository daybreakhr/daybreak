import { Role } from '@prisma/client'
import { UserInfo } from 'firebase/auth'

export type Member = UserInfo & { role: Role }

export type MemberTableData = {
  rowId: string
  id?: string
  uid?: string
  email: string
  role: string
  displayName?: string
  photoURL?: string

  memberId: string
}

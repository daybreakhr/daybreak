import { UserInfo } from 'firebase/auth'

export type Role = 'admin' | 'member'

export type Member = UserInfo & Role

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

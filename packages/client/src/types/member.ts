import { Workspace, Member as PMember } from '@prisma/client'
import { UserInfo } from 'firebase/auth'

export type Member = PMember & {
  Workspace: Workspace
}

export type MemberWithUserInfo = PMember & UserInfo

export type MemberTableData = {
  rowId: string
  uid?: string
  email: string
  role: string
  displayName?: string
  photoURL?: string
  id: string
  isSuspended?: boolean
}

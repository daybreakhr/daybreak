import { Invitees } from '@prisma/client'
import { MemberTableData } from 'types/member'
import { UserWithClaims } from 'types/user'

export function getMemberTableData(
  members: UserWithClaims[],
  invitedMembers: Invitees[],
): MemberTableData[] {
  const tableData: MemberTableData[] = []

  members.map(({ uid, email, role, displayName, photoURL }) =>
    tableData.push({
      rowId: uid,
      uid,
      email,
      role,
      displayName,
      photoURL,
    } as MemberTableData),
  )
  invitedMembers.map(({ id, email, role }) =>
    tableData.push({ rowId: id, id, email, role } as MemberTableData),
  )

  return tableData
}

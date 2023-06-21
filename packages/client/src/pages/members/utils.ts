import { Invitees } from '@prisma/client'
import { MemberTableData, MemberWithUserInfo } from 'types/member'

export function getMemberTableData(
  members?: MemberWithUserInfo[],
  invitedMembers?: Invitees[],
): MemberTableData[] {
  const tableData: MemberTableData[] = []

  members?.map(({ uid, id, email, role, displayName, photoURL, isSuspended }) =>
    tableData.push({
      rowId: uid,
      id,
      uid,
      email,
      role,
      displayName,
      photoURL,
      isSuspended,
    } as MemberTableData),
  )

  invitedMembers?.map(({ id, email, role }) =>
    tableData.push({ rowId: id, id, email, role } as MemberTableData),
  )

  return tableData
}

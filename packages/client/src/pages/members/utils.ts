import { Invitees } from '@prisma/client'
import { Member, MemberTableData } from 'types/member'

export function getMemberTableData(
  members?: Member[],
  invitedMembers?: Invitees[],
): MemberTableData[] {
  const tableData: MemberTableData[] = []

  members?.map(
    ({ uid, memberId, email, role, displayName, photoURL, isSuspended }) =>
      tableData.push({
        rowId: uid,
        memberId,
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

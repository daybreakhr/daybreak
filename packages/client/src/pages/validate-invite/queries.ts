import { Member } from '@prisma/client'
import client from 'utils/client'

export async function verifyInvitee({ inviteId }: { inviteId: string }) {
  // 'workspace' in path is hardcoded as it can take any string.
  const { data } = await client.post<Member>('workspace/invite/validate', {
    inviteId,
  })
  return data
}

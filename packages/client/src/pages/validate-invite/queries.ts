import client from 'utils/client'

export async function verifyMember({ inviteId }: { inviteId: string }) {
  // 'workspace' in path is hardcoded as it can take any string.
  const { data } = await client.post<boolean>('workspace/invite/validate', {
    inviteId,
  })
  return data
}

import { Credentials } from 'google-auth-library'
import { Member } from 'types/member'
import { storage } from 'ui-kit'
import client from 'utils/client'

export async function fetchGoogleTokens({ code }: { code: string }) {
  const { data } = await client.post<Credentials>(
    'auth/google',
    { code },
    { withCredentials: true },
  )
  return data
}

export async function updateAppStatus({
  appName,
  memberId,
  isInstalled,
}: {
  appName: 'gmail' | 'gcal'
  memberId: string
  isInstalled: boolean
}) {
  const workspaceId = storage.get('workspaceId')
  const { data } = await client.post<Member>(
    `${workspaceId}/members/${memberId}/apps`,
    { appName, isInstalled },
  )
  return data
}

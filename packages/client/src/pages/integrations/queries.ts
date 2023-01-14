import { Credentials } from 'google-auth-library'
import client from 'utils/client'

export async function fetchGoogleTokens({ code }: { code: string }) {
  const { data } = await client.post<Credentials>('auth/google', { code })
  return data
}

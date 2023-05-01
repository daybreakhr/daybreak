import client from 'utils/client'

export async function fetchSlackTokens({ code }: { code: string }) {
  const { data } = await client.post('auth/slack', { code })
  return data
}

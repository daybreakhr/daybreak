import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchSlackTokens } from './queries'

export default function ConnectSlack() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code') ?? ''

  useQuery(['slack', code], () => fetchSlackTokens({ code }), {
    onSuccess: () => {},
  })

  return null
}

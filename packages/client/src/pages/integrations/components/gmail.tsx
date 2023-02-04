import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { storage } from 'ui-kit'
import { fetchGoogleTokens } from '../queries'
import AppCard from './app-card'

export default function Gmail() {
  const [isConnected, setIsConnected] = useState(false)

  const googleLogin = useGoogleLogin({
    // Get authorisation token for sending emails via gmail
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onSuccess: async ({ code }) => {
      const data = await fetchGoogleTokens({ code })
      storage.set('accessToken', data.access_token ?? '')
      setIsConnected(true)
    },
    flow: 'auth-code',
  })

  return (
    <AppCard
      title="Gmail"
      isConnected={isConnected}
      onClick={() => googleLogin()}
      description="Engage with candidates via email and create automated email workflows"
      logo="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
    />
  )
}

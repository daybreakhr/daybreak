import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import useAuth from 'hooks/use-auth'
import AppCard from './app-card'
import { fetchGoogleTokens, updateAppStatus } from '../queries'

export default function Gmail() {
  const { member, setMember } = useAuth()
  const isInstalled = member?.Integration?.gmail?.isInstalled

  const { mutate, isLoading } = useMutation(updateAppStatus, {
    onSuccess: (member) => setMember(member),
  })

  const googleLogin = useGoogleLogin({
    // Get authorisation token for sending emails via gmail
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onSuccess: async ({ code }) => {
      await fetchGoogleTokens({ code })
      mutate({
        appName: 'gmail',
        isInstalled: true,
        memberId: member?.id ?? '',
      })
    },
    flow: 'auth-code',
  })

  return (
    <AppCard
      title="Gmail"
      isLoading={isLoading}
      isConnected={!!isInstalled}
      onClick={() => googleLogin()}
      description="Engage with candidates via email and create automated email workflows"
      logo="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
    />
  )
}

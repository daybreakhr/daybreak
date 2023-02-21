import { useMutation } from '@tanstack/react-query'
import { useGoogleLogin } from '@react-oauth/google'
import useAuth from 'hooks/use-auth'
import AppCard from './app-card'
import { fetchGoogleTokens, updateAppStatus } from '../queries'

export default function Calendar() {
  const { member, setMember } = useAuth()
  const isInstalled = member?.Integration?.gcal?.isInstalled

  const { mutate, isLoading } = useMutation(updateAppStatus, {
    onSuccess: (member) => setMember(member),
  })

  const googleLogin = useGoogleLogin({
    // Get authorisation token for reading and editing events in google calendar
    scope: 'https://www.googleapis.com/auth/calendar.events',
    onSuccess: async ({ code }) => {
      await fetchGoogleTokens({ code })
      mutate({
        appName: 'gcal',
        isInstalled: true,
        memberId: member?.id ?? '',
      })
    },
    flow: 'auth-code',
  })

  return (
    <AppCard
      isLoading={isLoading}
      title="Google Calendar"
      isConnected={!!isInstalled}
      onClick={() => googleLogin()}
      description="Schedule and manage interviews directly within Daybreak Hire"
      logo="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
    />
  )
}

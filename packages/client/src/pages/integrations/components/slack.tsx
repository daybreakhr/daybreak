import useAuth from 'hooks/use-auth'
import AppCard from './app-card'

export default function Slack() {
  const { member } = useAuth()
  const isInstalled = member?.Integration?.slack?.isInstalled

  return (
    <AppCard
      title="Slack"
      isLoading={false}
      isConnected={!!isInstalled}
      onClick={() =>
        window.open(
          'https://slack.com/oauth/v2/authorize?client_id=4045216441856.5071419400464&scope=chat:write,commands,im:write,users:read,files:read',
          '_blank',
        )
      }
      description="Refer candidates to your team via Slack, receive notifications and more"
      logo="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
    />
  )
}

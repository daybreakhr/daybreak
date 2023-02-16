import { Button } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import useAuth from 'hooks/use-auth'

type CalendarButtonProps = {
  onClick: () => void
}

export default function CalendarButton({ onClick }: CalendarButtonProps) {
  const { member } = useAuth()

  const isCalendarConnected = member?.App.some(
    (app) => app.appName === 'gcalendar' && app.isInstalled,
  )

  return (
    <Button
      onClick={onClick}
      icon={<CalendarOutlined />}
      disabled={!isCalendarConnected}
    >
      Schedule Interview
    </Button>
  )
}

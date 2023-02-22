import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import useAuth from 'hooks/use-auth'

type MailButtonProps = {
  onClick: () => void
}

export default function MailButton({ onClick }: MailButtonProps) {
  const { member } = useAuth()

  const isGmailConnected = member?.Integration?.gmail?.isInstalled

  return (
    <Button
      type="primary"
      onClick={onClick}
      icon={<MailOutlined />}
      disabled={!isGmailConnected}
    >
      Send Mail
    </Button>
  )
}

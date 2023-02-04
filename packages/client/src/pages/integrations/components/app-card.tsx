import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

type AppCardProps = {
  logo: string
  title: string
  onClick: () => void
  isConnected: boolean
  description: string
}

export default function AppCard({
  logo,
  title,
  isConnected,
  description,
  onClick,
}: AppCardProps) {
  return (
    <div className="flex p-4 space-x-4 border rounded-md shadow">
      <img src={logo} className="w-16 h-16" />

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-700 mb-0.5">{title}</h3>
        <p className="mb-2 text-sm text-gray-500">{description}</p>

        <div className="flex-1 w-1" />
        <Button
          onClick={onClick}
          disabled={isConnected}
          type={isConnected ? 'default' : 'primary'}
          icon={isConnected ? <CheckOutlined /> : null}
        >
          {isConnected ? 'Connected' : 'Connect'}
        </Button>
      </div>
    </div>
  )
}

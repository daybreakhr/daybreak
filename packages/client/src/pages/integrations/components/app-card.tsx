import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

type AppCardProps = {
  logo: string
  title: string
  isLoading: boolean
  onClick: () => void
  isConnected: boolean
  description: string
}

export default function AppCard({
  logo,
  title,
  isLoading,
  isConnected,
  description,
  onClick,
}: AppCardProps) {
  return (
    <div className="flex p-4 space-x-4 border rounded-md shadow">
      <img src={logo} className="w-12 h-12" />

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-700 mb-0.5">{title}</h3>
        <p className="mb-2 text-sm text-gray-500">{description}</p>

        <div className="flex-1 w-1" />
        <Button
          onClick={onClick}
          loading={isLoading}
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

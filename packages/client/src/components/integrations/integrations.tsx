import { RightOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import { HiX } from 'react-icons/hi'

const availableApps = [
  {
    title: 'Google Calendar',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
    description: 'Schedule and manage interviews directly within Daybreak Hire',
  },
  {
    title: 'Slack',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    description:
      'Refer candidates to your team via Slack, receive notifications and more',
  },
  {
    title: 'Gmail',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    description:
      'Engage with candidates via email and create automated email workflows',
  },
]

type IntegrationsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Integrations({ isOpen, onClose }: IntegrationsProps) {
  const container = document.getElementById('application') as Element

  return (
    <Drawer
      width={320}
      open={isOpen}
      closable={false}
      placement="left"
      onClose={onClose}
      getContainer={container}
      rootStyle={{ position: 'absolute' }}
    >
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">Integrations</p>
        <Button size="small" type="text" icon={<HiX />} onClick={onClose} />
      </div>

      <hr className="my-5" />

      <div className="text-xs text-gray-500">
        <p className="mb-4 font-medium">No apps connected yet.</p>
        <p>
          Introducing Seamless App Integrations: Streamline Your Recruitment
          Process by Connecting with Your Favorite Tools
        </p>
      </div>

      <hr className="my-5" />

      <p className="mb-4 text-xs font-medium text-gray-500">Available</p>

      <div className="flex flex-col gap-4">
        {availableApps.map(({ title, imgSrc, description }) => (
          <div key={title} className="mb-4">
            <img src={imgSrc} alt={title} className="w-8 h-8 mb-4" />
            <div className="mb-2">
              <p className="mb-1 text-sm font-semibold">{title}</p>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
            <Button block>
              Connect <RightOutlined />
            </Button>
          </div>
        ))}
      </div>
    </Drawer>
  )
}

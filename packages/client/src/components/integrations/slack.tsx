import { Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { RightOutlined } from '@ant-design/icons'
import { storage } from 'ui-kit'

const { title, imgSrc, description } = {
  title: 'Slack',
  imgSrc:
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  description:
    'Refer candidates to your team via Slack, receive notifications and more',
}

export default function Slack() {
  function handleSlackConnect() {
    const state = uuidv4()
    storage.set('state', state)

    window.open(
      `https://slack.com/oauth/v2/authorize?client_id=4045216441856.5071419400464&scope=chat:write,commands,im:write,users:read,files:read&state=${state}`,
      '_blank',
    )
  }

  return (
    <div className="mb-4">
      <img src={imgSrc} alt={title} className="w-8 h-8 mb-4" />
      <div className="mb-2">
        <p className="mb-1 text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Button block onClick={handleSlackConnect}>
        Connect <RightOutlined />
      </Button>
    </div>
  )
}

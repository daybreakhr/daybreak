import { Button, Drawer } from 'antd'
import { HiOutlineLink, HiX } from 'react-icons/hi'

import { Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'

import Slack from './slack'
import Gmail from './gmail'
import Calendar from './calendar'
import getAppDetails from './utils'

type IntegrationsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Integrations({ isOpen, onClose }: IntegrationsProps) {
  const { member } = useAuth()
  const container = document.getElementById('application') as Element

  const isGCalInstalled = member?.Integration?.gcal?.isInstalled
  const isSlackInstalled = member?.Integration?.slack?.isInstalled
  const isGmailInstalled = member?.Integration?.gmail?.isInstalled

  return (
    <Drawer
      width={360}
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

      <Show when={!isGCalInstalled && !isGmailInstalled && !isSlackInstalled}>
        <div className="text-xs text-gray-500">
          <p className="mb-4 font-medium">No apps connected yet.</p>
          <p>
            Introducing Seamless App Integrations: Streamline Your Recruitment
            Process by Connecting with Your Favorite Tools
          </p>
        </div>
      </Show>

      <div className="space-y-6">
        {getAppDetails({
          isGCalInstalled,
          isGmailInstalled,
          isSlackInstalled,
        }).map(({ isInstalled, title, imgSrc }) => (
          <Show key={title} when={isInstalled}>
            <div className="flex items-center space-x-2">
              <img alt={title} className="w-8 h-8" src={imgSrc} />
              <p className="font-medium">{title}</p>

              <div className="flex-1" />

              <div className="flex items-center px-3 py-1 space-x-2 rounded-md text-success-700 bg-success-50">
                <HiOutlineLink />
                <span className="font-medium">Connected</span>
              </div>
            </div>
          </Show>
        ))}
      </div>

      <Show when={!isGCalInstalled || !isGmailInstalled || !isSlackInstalled}>
        <hr className="my-5" />

        <p className="mb-4 text-xs font-medium text-gray-500">Available</p>

        <div className="flex flex-col gap-4">
          <Show when={!isGCalInstalled}>
            <Calendar />
          </Show>

          <Show when={!isSlackInstalled}>
            <Slack />
          </Show>

          <Show when={!isGmailInstalled}>
            <Gmail />
          </Show>
        </div>
      </Show>
    </Drawer>
  )
}

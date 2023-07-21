import { HiX } from 'react-icons/hi'
import { Button, Drawer, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { fetchMe } from 'components/auth/queries'
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg'
import { ReactComponent as UnLinkIcon } from 'assets/icons/unlink.svg'

import Slack from './slack'
import Gmail from './gmail'
import Calendar from './calendar'
import getAppDetails from './utils'
import { disconnectSlack } from './queries'

type IntegrationsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Integrations({ isOpen, onClose }: IntegrationsProps) {
  const { member, setMember } = useAuth()
  const container = document.getElementById('application') as Element

  useQuery(['me'], fetchMe, {
    onSuccess: setMember,
  })

  const isGCalInstalled = member?.Integration?.gcal?.isInstalled
  const isSlackInstalled = member?.Integration?.slack?.isInstalled
  const isGmailInstalled = member?.Integration?.gmail?.isInstalled

  const queryClient = useQueryClient()
  const { mutate } = useMutation(disconnectSlack, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me'])
      message.success('Slack app is disconnected successfully!')
    },
  })

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
        }).map(({ isInstalled, title, imgSrc }) => (
          <Show key={title} when={isInstalled}>
            <div className="flex items-center space-x-2">
              <img alt={title} className="w-8 h-8" src={imgSrc} />
              <p className="font-medium">{title}</p>

              <div className="flex-1" />

              <div className="flex items-center px-3 py-1 space-x-2 rounded-md text-success-700 bg-success-50">
                <LinkIcon />
                <span className="font-medium">Connected</span>
              </div>
            </div>
          </Show>
        ))}

        <Show when={isSlackInstalled}>
          <div className="flex items-center space-x-2 group">
            <img
              alt="Slack"
              className="w-8 h-8"
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
            />
            <p className="font-medium">Slack</p>
            <div className="flex-1" />

            <div
              onClick={() => mutate()}
              className="flex items-center px-3 py-1 space-x-2 rounded-md cursor-pointer group-hover:bg-red-50 group-hover:text-red-500 text-success-700 bg-success-50"
            >
              <LinkIcon className="group-hover:hidden" />
              <UnLinkIcon className="hidden group-hover:block" />
              <span className="font-medium group-hover:hidden">Connected</span>
              <span className="hidden font-medium group-hover:inline">
                Disconnect
              </span>
            </div>
          </div>
        </Show>
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

import { ReactNode, useState } from 'react'
import clsx from 'clsx'
import { Checkbox } from 'antd'
import { Show } from 'ui-kit'

type CardProps = {
  title: string
  logo: ReactNode
  description: string
  comingSoon: boolean
}

export default function Card({
  title,
  logo,
  comingSoon,
  description,
}: CardProps) {
  const [checked, setChecked] = useState(true)

  return (
    <button
      className={clsx('p-6 border rounded-md', {
        'cursor-not-allowed bg-gray-50': comingSoon,
      })}
      onClick={() => setChecked(true)}
    >
      <div className="flex items-center mb-4 space-x-2">
        <div>{logo}</div>
        <span className="font-semibold">{title}</span>
        <div className="flex-1" />
        <Show when={!comingSoon}>
          <Checkbox checked={checked} onChange={() => setChecked(true)} />
        </Show>
        <Show when={comingSoon}>
          <span className="text-xs text-gray-500 uppercase">Coming Soon</span>
        </Show>
      </div>
      <p className="text-left text-gray-500">{description}</p>
    </button>
  )
}

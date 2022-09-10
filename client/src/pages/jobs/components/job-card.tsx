import { cloneElement, ReactElement } from 'react'
import clsx from 'clsx'

type JobCardProps = {
  title: string
  description: string
  count: number
  icon: ReactElement
}

export default function JobCard({
  title,
  description,
  count,
  icon,
}: JobCardProps) {
  return (
    <div className="shadow-md bg-white py-4 flex items-start justify-between px-6 rounded-md">
      <div className="flex flex-col">
        <p className="text-base font-medium mb-4 text-gray-700">{title}</p>
        <span className="text-3xl font-semibold mb-0.5">{count}</span>
        <span className="text-gray-500 font-light">{description}</span>
      </div>
      {cloneElement(icon, {
        className: clsx('text-4xl rounded-md p-2', icon.props.className),
      })}
    </div>
  )
}

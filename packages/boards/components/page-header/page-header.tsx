import type { ReactNode } from 'react'
import Link from 'next/link'
import { capitalize, words } from 'lodash'
import { Breadcrumb, TabsProps } from 'antd'
import { JobType } from '@prisma/client'
import { AiOutlineEnvironment } from 'react-icons/ai'
import { Show } from 'ui-kit'

type BreadCrumbItem = {
  label: string
  icon?: ReactNode
  path: string
}

type PageHeaderProps = {
  title: ReactNode
  location?: string
  jobType: JobType | null
  experience: string | null
  breadcrumb: BreadCrumbItem[]
  tabs?: TabsProps['items']
}

export default function PageHeader({
  title,
  location,
  jobType,
  experience,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="w-full py-4 bg-white border-b border-gray-100 rounded">
      <div className="px-8">
        <Breadcrumb className="mb-2">
          {breadcrumb.map((item) => (
            <Breadcrumb.Item key={item.path}>
              <Link href={item.path} as={item.path}>
                <a className="space-x-2">
                  {item.icon ?? null}
                  <span>{item.label}</span>
                </a>
              </Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        <p className="mb-2 font-sans text-lg font-medium">{title}</p>

        <p className="flex items-center space-x-4 text-sm text-gray-500">
          <Show when={location}>
            <p className="inline-flex items-center space-x-1">
              <AiOutlineEnvironment />
              <span>{location}</span>
            </p>
          </Show>
          <Show when={jobType}>
            <span>{capitalize(words(jobType ?? '').join(' '))}</span>
          </Show>
          <Show when={experience}>
            <span>{experience} of experience</span>
          </Show>
        </p>
      </div>
    </div>
  )
}

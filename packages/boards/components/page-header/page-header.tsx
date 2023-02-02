import { ReactNode } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Breadcrumb, Skeleton, TabsProps } from 'antd'
import { capitalize, words } from 'lodash'
import { Show } from 'ui-kit'
import { AiOutlineEnvironment } from 'react-icons/ai'

type BreadCrumbItem = {
  label: string
  icon?: ReactNode
  path: string
}

type PageHeaderProps = {
  title: ReactNode
  location?: ReactNode
  jobType?: ReactNode
  experience?: ReactNode
  isLoading?: boolean
  breadcrumb: BreadCrumbItem[]
  tabs?: TabsProps['items']
}

export default function PageHeader({
  title,
  location,
  jobType,
  experience,
  isLoading,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="w-full pt-4 bg-white border-b border-gray-100 rounded">
      <div className="pl-8 ">
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
        <Show
          when={!isLoading}
          fallback={<Skeleton active title paragraph={{ rows: 2 }} />}
        >
          <p className="font-sans text-lg font-medium">{title}</p>
          <span className="flex mt-2 text-sm text-gray-500">
            <Show when={location}>
              <p>
                <AiOutlineEnvironment className="mr-1" />
                {location}
              </p>
            </Show>
            <Show when={jobType}>
              <p className="ml-4">{capitalize(words(jobType).join(' '))}</p>
            </Show>
            <Show when={experience}>
              <p className="ml-4">{experience} of experience</p>
            </Show>
          </span>
        </Show>
      </div>
    </div>
  )
}

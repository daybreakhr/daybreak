import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Skeleton } from 'antd'
import { Show } from 'ui-kit'

type BreadCrumbItem = {
  label: string
  icon?: ReactNode
  path: string
}

type PageHeaderProps = {
  title: ReactNode
  isLoading?: boolean
  breadcrumb: BreadCrumbItem[]
}

export default function PageHeader({
  title,
  isLoading,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="w-full px-8 py-4 bg-white border-b border-gray-100">
      <Breadcrumb className="mb-2">
        {breadcrumb.map((item) => (
          <Breadcrumb.Item key={item.path}>
            <Link to={item.path} className="space-x-2">
              {item.icon ?? null}
              <span>{item.label}</span>
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <Show
        when={!isLoading}
        fallback={<Skeleton active title paragraph={{ rows: 0 }} />}
      >
        <p className="font-sans text-lg font-medium">{title}</p>
      </Show>
    </div>
  )
}

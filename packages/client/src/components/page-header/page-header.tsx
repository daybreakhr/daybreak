import { ReactNode } from 'react'
import clsx from 'clsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb, Skeleton, Tabs, TabsProps } from 'antd'
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
  tabs?: TabsProps['items']
}

export default function PageHeader({
  title,
  isLoading,
  breadcrumb,
  tabs,
}: PageHeaderProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleTabChange(activeKey: string) {
    navigate(activeKey)
  }

  return (
    <div className="w-full px-8 pt-4 bg-white border-b border-gray-100">
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
        <p className={clsx('font-sans text-lg font-medium', { 'mb-4': !tabs })}>
          {title}
        </p>
      </Show>

      <Show when={tabs}>
        <Tabs
          items={tabs}
          activeKey={pathname}
          className="header-tabs"
          onChange={handleTabChange}
        />
      </Show>
    </div>
  )
}

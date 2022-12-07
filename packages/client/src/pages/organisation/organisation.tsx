import { useQuery } from '@tanstack/react-query'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { SettingOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import { Show } from 'ui-kit'
import Departments from './components/departments'
import OrgDetails from './components/details'
import Locations from './components/locations'
import { fetchOrganisation } from './queries'

export default function Organisation() {
  const { data } = useQuery(['organisation'], fetchOrganisation)

  const title = (
    <span className="flex items-center">
      <span className="mr-4">Organisation</span>
      <Show when={data}>
        <a
          target="_blank"
          className="inline-flex items-center space-x-1 text-sm"
          href={`${import.meta.env.VITE_BOARDS_APP_URL}/${data?.slug}`}
          rel="noreferrer"
        >
          <HiOutlineExternalLink />
          <span>Career Site</span>
        </a>
      </Show>
    </span>
  )

  return (
    <>
      <PageHeader
        title={title}
        breadcrumb={[
          {
            label: 'Settings',
            path: '/settings/organisation',
            icon: <SettingOutlined />,
          },
          { label: 'Organisation', path: '/settings/organisation' },
        ]}
      />
      <OrgDetails />
      <Departments />
      <Locations />
    </>
  )
}

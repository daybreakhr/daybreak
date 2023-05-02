import { useQuery } from '@tanstack/react-query'
import { SettingOutlined } from '@ant-design/icons'

import useAuth from 'hooks/use-auth'
import PageHeader from 'components/page-header'
import { fetchMe } from 'components/auth/queries'

import Calendar from './components/calendar'
import Gmail from './components/gmail'
import Slack from './components/slack'

export default function Integrations() {
  const { setMember } = useAuth()

  useQuery(['me'], fetchMe, {
    onSuccess: setMember,
    refetchOnWindowFocus: true,
  })

  return (
    <>
      <PageHeader
        title="Integrations"
        breadcrumb={[
          {
            label: 'Settings',
            path: '/settings/organisation',
            icon: <SettingOutlined />,
          },
          { label: 'Integrations', path: '/settings/integrations/' },
        ]}
      />

      <div className="p-4 m-8 bg-white rounded-md shadow-md h-fit">
        <p className="mb-4 font-sans text-xl font-medium">Available Apps</p>
        <div className="grid grid-cols-3 gap-6 2xl:grid-cols-4">
          <Calendar />
          <Gmail />
          <Slack />
        </div>
      </div>
    </>
  )
}

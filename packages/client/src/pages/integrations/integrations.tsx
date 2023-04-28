import { SettingOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import Calendar from './components/calendar'
import Gmail from './components/gmail'

export default function Integrations() {
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
        </div>
      </div>
    </>
  )
}

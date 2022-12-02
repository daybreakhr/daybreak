import { SettingOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import Departments from './components/departments'
import OrgDetails from './components/details'
import Locations from './components/locations'

export default function Organisation() {
  return (
    <>
      <PageHeader
        title="Members"
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

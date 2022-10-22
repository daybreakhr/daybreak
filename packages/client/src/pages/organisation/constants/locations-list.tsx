import type { Location } from '@prisma/client'
import type { ColumnsType } from 'antd/es/table'
import LocationActions from '../components/location-actions'

export const locationColumns: ColumnsType<Location> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    key: 'actions',
    align: 'right',
    render: (_, record) => <LocationActions record={record} />,
  },
]

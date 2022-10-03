import type { Department } from '@prisma/client'
import type { ColumnsType } from 'antd/es/table'
import DepartmentActions from '../components/department-actions'

export const departmentColumns: ColumnsType<Department> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    key: 'actions',
    align: 'right',
    render: (_, record) => <DepartmentActions record={record} />,
  },
]

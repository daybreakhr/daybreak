import type { Department } from '@prisma/client'
import { Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export const departmentColumns: ColumnsType<Department> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    key: 'actions',
    align: 'right',
    render: () => (
      <div className="space-x-2">
        <Button type="link">Edit</Button>
        <Button type="link" danger>
          Delete
        </Button>
      </div>
    ),
  },
]

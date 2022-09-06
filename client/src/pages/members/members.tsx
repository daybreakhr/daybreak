import { Key } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import memberTabs from './members-list'

export default function Members() {
  interface DataType {
    key: Key
    name: string
    role: string
    actions: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ]

  return (
    <div className="mt-5">
      <Table
        columns={columns}
        dataSource={memberTabs}
        pagination={{ position: ['bottomCenter'] }}
        bordered={true}
      />
    </div>
  )
}

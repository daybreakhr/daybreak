import { useQuery } from '@tanstack/react-query'
import { Button, Table } from 'antd'
import { fetchDepartments } from 'pages/create-job/queries'
import { AiOutlinePlus } from 'react-icons/ai'
import { departmentColumns } from '../constants/departments-list'

export default function Departments() {
  const { data, isLoading } = useQuery(['departments'], fetchDepartments)

  return (
    <div className="p-4 mx-8 mb-8 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="font-sans text-xl font-medium">Departments</p>
        <Button type="primary" icon={<AiOutlinePlus />}>
          Add Department
        </Button>
      </div>
      <Table
        size="small"
        loading={isLoading}
        dataSource={data ?? []}
        columns={departmentColumns}
        pagination={(data?.length ?? 0) < 10 ? false : undefined}
      />
    </div>
  )
}

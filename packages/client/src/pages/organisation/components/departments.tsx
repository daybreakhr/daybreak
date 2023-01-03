import { useState } from 'react'
import { Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Show } from 'ui-kit'

import useAuth from 'hooks/use-auth'
import { fetchDepartments } from 'pages/create-job/queries'

import { addDepartment } from '../queries'
import DepartmentForm from './department-form'
import { departmentColumns } from '../constants/departments-list'

export default function Departments() {
  const { member } = useAuth()
  const [addDepartmentForm, setAddDepartmentForm] = useState(false)
  const { data, isLoading } = useQuery(['departments'], fetchDepartments)

  return (
    <div className="p-4 mx-8 mb-8 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="font-sans text-xl font-medium">Departments</p>

        <Show when={member?.role === 'admin'}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddDepartmentForm(true)}
          >
            Add Department
          </Button>
        </Show>
      </div>

      <Table
        size="small"
        loading={isLoading}
        dataSource={data ?? []}
        columns={departmentColumns}
        rowKey={(record) => record.id}
        pagination={(data?.length ?? 0) < 10 ? false : undefined}
      />

      <DepartmentForm
        title="Add Department"
        visible={addDepartmentForm}
        mutationFunc={addDepartment}
        onCancel={() => setAddDepartmentForm(false)}
      />
    </div>
  )
}

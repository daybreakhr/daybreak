import { useState } from 'react'
import { Button, message, Modal } from 'antd'
import type { Department } from '@prisma/client'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from 'hooks/use-auth'
import { deleteDepartment, updateDepartment } from '../queries'
import DepartmentForm from './department-form'

type DepartmentActionsProps = {
  record: Department
}

export default function DepartmentActions({ record }: DepartmentActionsProps) {
  const { user } = useAuth()
  const [editDepartment, setEditDepartment] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(deleteDepartment, {
    onSuccess: () => queryClient.invalidateQueries(['departments']),
    onError: (err: any) => {
      message.error(err?.response?.data?.error)
    },
  })

  function handleDelete() {
    Modal.confirm({
      title: 'Are you sure delete this department?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        mutate({ id: record.id })
      },
    })
  }

  return (
    <div className="space-x-2">
      <Button
        type="link"
        disabled={user?.role === 'member'}
        onClick={() => setEditDepartment(true)}
      >
        Edit
      </Button>
      <Button
        danger
        type="link"
        onClick={handleDelete}
        disabled={user?.role === 'member'}
      >
        Delete
      </Button>

      <DepartmentForm
        title="Edit Department"
        visible={editDepartment}
        mutationFunc={updateDepartment}
        initialValues={{ name: record.name, id: record.id }}
        onCancel={() => setEditDepartment(false)}
      />
    </div>
  )
}

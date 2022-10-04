import { useState } from 'react'
import { Button, message, Modal } from 'antd'
import type { Location } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { deleteLocation, updateLocation } from '../queries'
import LocationForm from './location-form'

type LocationActionsProps = {
  record: Location
}

export default function LocationActions({ record }: LocationActionsProps) {
  const [editLocation, setEditLocation] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(deleteLocation, {
    onSuccess: () => queryClient.invalidateQueries(['locations']),
    onError: (err: any) => {
      message.error(err?.response?.data?.error)
    },
  })

  function handleDelete() {
    Modal.confirm({
      title: 'Are you sure delete this location?',
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
      <Button type="link" onClick={() => setEditLocation(true)}>
        Edit
      </Button>
      <Button type="link" danger onClick={handleDelete}>
        Delete
      </Button>

      <LocationForm
        title="Edit Location"
        visible={editLocation}
        mutationFunc={updateLocation}
        initialValues={{ name: record.name, id: record.id }}
        onCancel={() => setEditLocation(false)}
      />
    </div>
  )
}

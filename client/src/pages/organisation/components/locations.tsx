import { useState } from 'react'
import { Button, Table } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
import { fetchLocations } from 'pages/create-job/queries'
import { locationColumns } from '../constants/locations-list'
import { addLocation } from '../queries'
import LocationForm from './location-form'

export default function Locations() {
  const [addLocationForm, setAddLocationForm] = useState(false)
  const { data, isLoading } = useQuery(['locations'], fetchLocations)

  return (
    <div className="p-4 mx-8 mb-8 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="font-sans text-xl font-medium">Locations</p>

        <Button
          type="primary"
          icon={<AiOutlinePlus />}
          onClick={() => setAddLocationForm(true)}
        >
          Add Location
        </Button>
      </div>

      <Table
        size="small"
        loading={isLoading}
        dataSource={data ?? []}
        columns={locationColumns}
        rowKey={(record) => record.id}
        pagination={(data?.length ?? 0) < 10 ? false : undefined}
      />

      <LocationForm
        title="Add Location"
        visible={addLocationForm}
        mutationFunc={addLocation}
        onCancel={() => setAddLocationForm(false)}
      />
    </div>
  )
}

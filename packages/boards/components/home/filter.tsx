import { Button, Checkbox, Select } from 'antd'
import _ from 'lodash'
import { useMemo } from 'react'
import {
  ExperienceLevelOptions,
  Job,
  JobFilterType,
  JobTypeOptions,
} from 'utils/utils'

type FilterProps = {
  filters: JobFilterType
  publishedJobs: Job[]
  setFilters: any
}

export default function Filter({
  publishedJobs,
  filters,
  setFilters,
}: FilterProps) {
  const locations = useMemo(() => {
    return _.uniqBy(publishedJobs, 'locationId').map(({ Location }) => ({
      value: Location?.id,
      label: Location?.name,
    }))
  }, [publishedJobs])

  return (
    <div className="flex flex-col space-y-6">
      <p className="mt-8 text-lg font-medium">Filters</p>
      <Select
        className="w-full"
        placeholder="Select Location"
        value={filters?.locationId}
        options={locations}
        onChange={(val: string) => setFilters({ ...filters, locationId: val })}
        allowClear
      />
      <hr className="w-full mt-6" />
      <p className="text-lg font-medium">Job Type</p>
      <Checkbox.Group
        defaultValue={[]}
        className="inline-block space-y-2"
        onChange={(val) => setFilters({ ...filters, jobType: val })}
        value={filters.jobType}
      >
        {JobTypeOptions.map(({ value, label }) => (
          <div key={value}>
            <Checkbox key={value} value={value}>
              {label}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>

      <hr className="w-full mt-6" />
      <p className="text-lg font-medium">Experience</p>
      <Checkbox.Group
        defaultValue={[]}
        className="inline-block space-y-2"
        onChange={(val) => setFilters({ ...filters, experience: val })}
        value={filters.experience}
      >
        {ExperienceLevelOptions.map(({ value, label }) => (
          <div key={value}>
            <Checkbox key={value} value={value}>
              {label}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
      <hr className="w-full mt-6" />
      <Button
        className="self-center w-32 my-4"
        type="primary"
        ghost
        onClick={() => {
          setFilters({ jobType: [], experience: [], locationId: null })
        }}
      >
        Reset
      </Button>
    </div>
  )
}

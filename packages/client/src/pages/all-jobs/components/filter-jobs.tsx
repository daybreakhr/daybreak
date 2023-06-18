import { useState } from 'react'
import { Priority } from '@prisma/client'
import { Button, Checkbox, Collapse, Drawer } from 'antd'

import { ReactComponent as FilterIcon } from 'assets/icons/filter-icon.svg'

type FilterJobsProps = {
  filteredPriority: string[]
  filteredDepartment: string[]
  filteredStatus: ('published' | 'draft')[]
  departments: { label: string; value: string }[]
  setFilteredPriority: (priority: string[]) => void
  setFilteredDepartment: (department: string[]) => void
  setFilteredStatus: (status: ('published' | 'draft')[]) => void
}

export default function FilterJobs({
  departments,
  filteredStatus,
  filteredPriority,
  setFilteredStatus,
  filteredDepartment,
  setFilteredPriority,
  setFilteredDepartment,
}: FilterJobsProps) {
  const [open, setOpen] = useState(false)

  const selectedPriority = ['high', 'medium', 'low'].filter(
    (priority) => !filteredPriority.includes(priority),
  )

  function handlePriorityChange(values: string[]) {
    const newPriority = ['high', 'medium', 'low'].filter(
      (priority) => !values.includes(priority),
    )
    setFilteredPriority(newPriority)
  }

  const selectedDepartment = departments
    .filter(({ value }) => !filteredDepartment.includes(value))
    .map(({ value }) => value)

  function handleDepartmentChange(values: string[]) {
    const newDepartment = departments
      .filter(({ value }) => !values.includes(value))
      .map(({ value }) => value)
    setFilteredDepartment(newDepartment)
  }

  const selectedJobStatus = ['published', 'draft'].filter(
    (status) => !filteredStatus.includes(status as 'published' | 'draft'),
  )

  function handleJobStatusChange(values: string[]) {
    const newStatus = ['published', 'draft'].filter(
      (status) => !values.includes(status as 'published' | 'draft'),
    )
    setFilteredStatus(newStatus as ('published' | 'draft')[])
  }

  return (
    <>
      <Button icon={<FilterIcon />} onClick={() => setOpen(true)} />

      <Drawer
        open={open}
        width={280}
        mask={false}
        closable={false}
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Apply Filter</p>
          <Button type="link" size="small" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>

        <Collapse
          ghost
          size="small"
          expandIconPosition="end"
          className="filter-collapse"
          defaultActiveKey={['department', 'priority', 'status']}
        >
          <Collapse.Panel key="department" header="Department" className="mb-4">
            <div className="p-2 vertical-checkbox">
              <Checkbox.Group
                options={departments}
                value={selectedDepartment}
                className="w-full space-y-2"
                onChange={(values) =>
                  handleDepartmentChange(values as string[])
                }
              />
            </div>
          </Collapse.Panel>

          <Collapse.Panel key="priority" header="Priority" className="mb-4">
            <div className="p-2 vertical-checkbox">
              <Checkbox.Group
                value={selectedPriority}
                className="w-full space-y-2"
                onChange={(values) => handlePriorityChange(values as string[])}
                options={[
                  { label: 'High', value: Priority.high },
                  { label: 'Medium', value: Priority.medium },
                  { label: 'Low', value: Priority.low },
                ]}
              />
            </div>
          </Collapse.Panel>

          <Collapse.Panel key="status" header="Status" className="mb-4">
            <div className="p-2 vertical-checkbox">
              <Checkbox.Group
                value={selectedJobStatus}
                className="w-full space-y-2"
                options={[
                  { label: 'Published', value: 'published' },
                  { label: 'Draft', value: 'draft' },
                ]}
                onChange={(values) => handleJobStatusChange(values as string[])}
              />
            </div>
          </Collapse.Panel>
        </Collapse>
      </Drawer>
    </>
  )
}

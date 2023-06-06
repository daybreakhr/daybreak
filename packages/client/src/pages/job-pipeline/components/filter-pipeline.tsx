import { useMemo, useState } from 'react'
import type { Interview } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox, Collapse, Drawer } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

import { getPipelineStages } from 'utils/utils'
import { ReactComponent as FilterIcon } from 'assets/icons/filter-icon.svg'

type FilterPipelineProps = {
  interviews: Interview[]
  filteredStages: string[]
  setFilteredStages: Dispatch<SetStateAction<string[]>>
}

export default function FilterPipeline({
  interviews,
  filteredStages,
  setFilteredStages,
}: FilterPipelineProps) {
  const [open, setOpen] = useState(false)

  const selectedStages = useMemo(
    () =>
      getPipelineStages(interviews)
        .filter(({ value }) => !filteredStages.includes(value))
        .map(({ value }) => value),
    [filteredStages, interviews],
  )

  function handleSourceChange(values: CheckboxValueType[]) {
    const newStages = getPipelineStages(interviews)
      .filter(({ value }) => !values.includes(value))
      .map(({ value }) => value)

    setFilteredStages(newStages)
  }

  return (
    <>
      <Button icon={<FilterIcon />} onClick={() => setOpen(true)} />

      <Drawer
        open={open}
        width={280}
        closable={false}
        onClose={() => setOpen(false)}
      >
        <p className="mb-4 font-semibold">Apply Filter</p>

        <Collapse
          ghost
          size="small"
          expandIconPosition="end"
          className="filter-collapse"
          defaultActiveKey={['source']}
        >
          <Collapse.Panel header="Source" key="source">
            <div className="flex flex-col">
              <div className="p-2 vertical-checkbox">
                <Checkbox.Group
                  value={selectedStages}
                  className="w-full space-y-3"
                  onChange={handleSourceChange}
                  options={getPipelineStages(interviews)}
                />
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
      </Drawer>
    </>
  )
}

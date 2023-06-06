import { useMemo, useState } from 'react'
import { TbArrowBarToRight } from 'react-icons/tb'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox, Collapse, Drawer, Radio, Space } from 'antd'
import { CandidateSource, Interview } from '@prisma/client'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

import { getPipelineStages } from 'utils/utils'
import { ReactComponent as FilterIcon } from 'assets/icons/filter-icon.svg'

type FilterPipelineProps = {
  interviews: Interview[]
  filteredStages: string[]
  selectedSources: string[]
  setFilteredStages: Dispatch<SetStateAction<string[]>>
  setSelectedSources: Dispatch<SetStateAction<string[]>>
}

export default function FilterPipeline({
  interviews,
  filteredStages,
  selectedSources,
  setFilteredStages,
  setSelectedSources,
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

  const sourceOptions = [
    { label: 'Portal', value: CandidateSource.jobBoard },
    { label: 'Referrals', value: CandidateSource.referral },
    { label: 'LinkedIn', value: CandidateSource.linkedIn },
    { label: 'Instahyre', value: CandidateSource.instahyre },
    { label: 'IIM Jobs', value: CandidateSource.iimjobs },
    { label: 'Naukri', value: CandidateSource.naukri },
  ]

  return (
    <>
      <Button icon={<FilterIcon />} onClick={() => setOpen(true)} />

      <Drawer
        open={open}
        width={280}
        closable={false}
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Apply Filter</p>
          <Button
            type="text"
            size="small"
            icon={<TbArrowBarToRight />}
            onClick={() => setOpen(false)}
          />
        </div>

        <Collapse
          ghost
          size="small"
          expandIconPosition="end"
          className="filter-collapse"
          defaultActiveKey={['source', 'date', 'stages']}
        >
          <Collapse.Panel key="source" header="Source" className="mb-4">
            <div className="p-2 vertical-checkbox">
              <Checkbox.Group
                value={selectedSources}
                options={sourceOptions}
                className="w-full space-y-2"
                onChange={(values) => setSelectedSources(values as string[])}
              />
            </div>
          </Collapse.Panel>

          <Collapse.Panel key="date" header="Date Applied" className="mb-4">
            <div className="p-2">
              <Radio.Group defaultValue="all-time">
                <Space direction="vertical">
                  <Radio value="all-time">All Time</Radio>
                  <Radio value="last-week">Last Week</Radio>
                  <Radio value="last-month">Last Month</Radio>
                  <Radio value="last-quarter">Last 3 Months</Radio>
                </Space>
              </Radio.Group>
            </div>
          </Collapse.Panel>

          <Collapse.Panel header="Stages" key="stages" className="mb-4">
            <div className="p-2 vertical-checkbox">
              <Checkbox.Group
                value={selectedStages}
                className="w-full space-y-2"
                onChange={handleSourceChange}
                options={getPipelineStages(interviews)}
              />
            </div>
          </Collapse.Panel>
        </Collapse>
      </Drawer>
    </>
  )
}

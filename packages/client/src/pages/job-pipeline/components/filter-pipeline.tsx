import { useState } from 'react'
import type { MenuProps } from 'antd'
import type { Interview } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox, Dropdown, Space } from 'antd'

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

  function handleOpenChange(flag: boolean) {
    setOpen(flag)
  }

  const handleMenuClick: MenuProps['onClick'] = ({ key, domEvent }) => {
    domEvent.stopPropagation()

    setFilteredStages((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key)
      }

      return [...prev, key]
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      type: 'group',
      label: 'Quick Filters',
      children: [
        {
          key: 'interview-dropdown',
          label: 'Interview Stages',
          children: [
            {
              key: 'interview-group',
              type: 'group',
              label: 'Interview Stages',
              children: getPipelineStages(interviews).map(
                ({ label, value }) => {
                  return {
                    key: value,
                    label: (
                      <Space>
                        <Checkbox checked={!filteredStages.includes(value)} />
                        {label}
                      </Space>
                    ),
                  }
                },
              ),
            },
          ],
        },
      ],
    },
  ]

  return (
    <Dropdown
      open={open}
      trigger={['click']}
      onOpenChange={handleOpenChange}
      menu={{
        items,
        multiple: true,
        onClick: handleMenuClick,
        triggerSubMenuAction: 'click',
      }}
    >
      <Button icon={<FilterIcon />} />
    </Dropdown>
  )
}

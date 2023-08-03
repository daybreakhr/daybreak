import React from 'react'
import { Input, Select } from 'antd'

const SalaryInput = () => {
  const { Option } = Select
  const selectAfter = (
    <>
      <Select defaultValue="USD" className="select-after">
        <Option value="USD">USD</Option>
      </Select>
    </>
  )
  return (
    <>
      <Input
        addonBefore="$ "
        addonAfter={selectAfter}
        size="large"
        placeholder="min"
      />
    </>
  )
}

export default SalaryInput

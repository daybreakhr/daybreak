import React, { ReactElement } from 'react'
import { Input, Select } from 'antd'
import { currency_list } from '../constants/create-job-values'

interface SalaryInputInterface {
  value: string | number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const SalaryInput = ({
  value,
  onChange,
}: SalaryInputInterface): ReactElement => {
  const selectAfter = (
    <>
      <Select
        defaultValue="USD"
        className="select-after"
        options={currency_list}
      />
    </>
  )
  return (
    <>
      <Input
        addonBefore="$"
        addonAfter={selectAfter}
        size="large"
        placeholder="min"
        value={value}
        onChange={onChange}
        style={{ background: '#fff' }}
      />
    </>
  )
}

export default SalaryInput

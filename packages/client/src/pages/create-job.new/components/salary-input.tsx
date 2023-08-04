import { ReactElement, ChangeEventHandler } from 'react'
import { Input, Select } from 'antd'
import { currency_list } from '../constants/create-job-values'

type SalaryInputProps = {
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function SalaryInput({
  value,
  onChange,
}: SalaryInputProps): ReactElement {
  const selectAfter = (
    <Select
      defaultValue="USD"
      className="select-after"
      options={currency_list}
    />
  )
  return (
    <Input
      addonBefore="$"
      addonAfter={selectAfter}
      size="large"
      placeholder="min"
      value={value}
      onChange={onChange}
      style={{ background: '#fff' }}
    />
  )
}

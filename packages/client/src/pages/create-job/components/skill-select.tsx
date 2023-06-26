import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, Select, SelectProps } from 'antd'

type OptionType = {
  label: string
  value: string
}

type SkillSelectProps = Omit<SelectProps<string>, 'options'> & {
  form: FormInstance<any>
  initialOptions?: OptionType[]
}

const NEW_ITEM = 'CREATE_NEW_ITEM'

export default function SkillSelect({
  form,
  initialOptions,
}: SkillSelectProps) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<OptionType[]>(initialOptions || [])

  const filteredOptions = options?.filter((o) =>
    o.label.toLowerCase().includes(inputValue.toLowerCase()),
  )

  function onChange(value: string) {
    if (value === NEW_ITEM) {
      const newSkillLabel = inputValue.trim()

      if (newSkillLabel) {
        const newSkillValue = newSkillLabel.toLowerCase().replace(/\s+/g, '-')
        const newOption = { label: newSkillLabel, value: newSkillValue }

        setOptions((prev) => [...prev, newOption])

        form.setFieldsValue({ skillId: newSkillValue })
        setInputValue('')
      }
    } else {
      form.setFieldsValue({ skillId: value })
    }
  }

  return (
    <Select
      showSearch
      allowClear
      onChange={onChange}
      onSearch={setInputValue}
      mode="multiple"
      optionFilterProp="children"
      placeholder="Select Skill..."
      value={form.getFieldValue('skillId')}
    >
      {inputValue && filteredOptions?.length === 0 && (
        <Select.Option key={NEW_ITEM} value={NEW_ITEM}>
          <PlusOutlined /> Create New: {`"${inputValue}"`}
        </Select.Option>
      )}
      {filteredOptions?.map((o) => (
        <Select.Option key={o.value} value={o.value}>
          {o.label}
        </Select.Option>
      ))}
    </Select>
  )
}

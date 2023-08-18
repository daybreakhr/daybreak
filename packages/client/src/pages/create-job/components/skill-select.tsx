import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, Select, SelectProps } from 'antd'
import { skillList } from '../constants/create-job-values'

type SkillSelectProps = Omit<SelectProps<string>, 'options'> & {
  form: FormInstance<any>
}

const NEW_ITEM = 'CREATE_NEW_ITEM'

export default function SkillSelect({ form }: SkillSelectProps) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(skillList)

  const filteredOptions = options?.filter((o) =>
    o.label.toLowerCase().includes(inputValue.toLowerCase()),
  )

  function onChange(value: string[]) {
    if (value.includes(NEW_ITEM)) {
      const newSkillLabel = inputValue.trim()

      if (newSkillLabel) {
        const newOption = { label: newSkillLabel, value: newSkillLabel }
        setOptions((prev) => [...prev, newOption])

        value = value.filter((v) => v !== NEW_ITEM)
        value.push(newSkillLabel)

        setInputValue('')
      }
    }

    form.setFieldsValue({ skills: value })
  }

  return (
    <Select
      showSearch
      allowClear
      onChange={onChange}
      onSearch={setInputValue}
      mode="multiple"
      optionFilterProp="children"
      placeholder="Select Skill"
      value={form.getFieldValue('skills')}
      size="large"
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

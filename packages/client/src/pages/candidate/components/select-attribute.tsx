import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, Select, SelectProps } from 'antd'
import { feedbackList } from '../constants/feedback-list'

type AttributeSelectProps = Omit<SelectProps<string>, 'options'> & {
  form: FormInstance<any>
}

const NEW_ITEM = 'CREATE_NEW_ITEM'

export default function AttributeSelect({ form }: AttributeSelectProps) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(feedbackList)

  const filteredOptions = options?.filter((o) =>
    o.toLowerCase().includes(inputValue.toLowerCase()),
  )

  function onChange(value: string[]) {
    if (value.includes(NEW_ITEM)) {
      const newAttributeLabel = inputValue.trim()

      if (newAttributeLabel) {
        setOptions((prev) => [...prev, newAttributeLabel])

        value = value.filter((v) => v !== NEW_ITEM)
        value.push(newAttributeLabel)

        setInputValue('')
      }
    }

    form.setFieldsValue({ attributes: value })
  }

  return (
    <Select
      showSearch
      allowClear
      onChange={onChange}
      onSearch={setInputValue}
      mode="multiple"
      optionFilterProp="children"
      placeholder="Select Attribute..."
      value={form.getFieldValue('attributes')}
    >
      {inputValue && filteredOptions?.length === 0 && (
        <Select.Option key={NEW_ITEM} value={NEW_ITEM}>
          <PlusOutlined /> Create New: {`"${inputValue}"`}
        </Select.Option>
      )}
      {filteredOptions?.map((o) => (
        <Select.Option key={o} value={o}>
          {o}
        </Select.Option>
      ))}
    </Select>
  )
}

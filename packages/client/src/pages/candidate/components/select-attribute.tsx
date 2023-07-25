import { useState } from 'react'
import { Form, Rate, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const NEW_ITEM = 'CREATE_NEW_ITEM'

type SelectAttributeProps = {
  name: string
  field: any
  form: any
  feedbackList: string[]
  setFeedbackList: (callback: (prev: string[]) => string[]) => void
}

function SelectAttribute({
  name,
  field,
  form,
  feedbackList,
  setFeedbackList,
}: SelectAttributeProps) {
  const [inputValue, setInputValue] = useState('')
  const filteredOptions = feedbackList.filter((o) =>
    o.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <div className="flex items-center justify-between">
      <Form.Item {...field} noStyle name={[field.name, 'name']}>
        <Select
          allowClear
          showSearch
          onSearch={setInputValue}
          optionFilterProp="children"
          className="w-64"
          placeholder="Select feedback"
          onChange={(value) => {
            if (value === NEW_ITEM) {
              const newSkillLabel = inputValue.trim()

              if (newSkillLabel) {
                setFeedbackList((prev) => [...prev, newSkillLabel])

                form.setFieldsValue({
                  attributes: form
                    .getFieldValue('attributes')
                    .map((f: any) =>
                      f.name === name ? { name: newSkillLabel, score: 0 } : f,
                    ),
                })

                setInputValue('')
              }
            }
          }}
        >
          {inputValue && filteredOptions.length === 0 && (
            <Select.Option key={NEW_ITEM} value={NEW_ITEM}>
              <PlusOutlined /> Create New: {`"${inputValue}"`}
            </Select.Option>
          )}
          {filteredOptions.map((o) => (
            <Select.Option key={o} value={o}>
              {o}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        {...field}
        name={[field.name, 'score']}
        noStyle
        rules={[
          {
            required: true,
            message: 'Assign a score for the selected skill',
          },
        ]}
      >
        <Rate />
      </Form.Item>
    </div>
  )
}

export default SelectAttribute

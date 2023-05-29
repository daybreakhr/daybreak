import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, Select, SelectProps } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLocation } from 'pages/organisation/queries'

type OptionType = {
  label: string
  value: string
}

type LocationSelectProps = Omit<SelectProps, 'options'> & {
  form: FormInstance<any>
  initialOptions?: OptionType[]
}

const NEW_ITEM = 'CREATE_NEW_ITEM'
export default function LocationSelect({
  form,
  initialOptions,
}: LocationSelectProps) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(initialOptions)

  const filteredOptions = options?.filter((o) =>
    o.label.toLowerCase().includes(inputValue.toLowerCase()),
  )

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(addLocation, {
    onSuccess: ({ id, name }) => {
      setOptions((prev) => {
        const newOption = { label: name, value: id }
        return prev ? [...prev, newOption] : [newOption]
      })
      form.setFieldValue('locationId', id)
      queryClient.invalidateQueries(['locations'])
      setInputValue('')
    },
  })

  function onChange(value: string) {
    if (value === NEW_ITEM) {
      form.setFieldValue('locationId', inputValue)
      mutate({ name: inputValue })
    } else {
      form.setFieldValue('locationId', value)
    }
  }

  return (
    <Select
      showSearch
      loading={isLoading}
      onChange={onChange}
      disabled={isLoading}
      onSearch={setInputValue}
      optionFilterProp="children"
      placeholder="Select location..."
      value={form.getFieldValue('locationId')}
    >
      {inputValue && filteredOptions?.length === 0 && (
        <Select.Option key={inputValue} value={NEW_ITEM}>
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

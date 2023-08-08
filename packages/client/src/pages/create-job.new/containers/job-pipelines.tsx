import {
  ArrowRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { List, Checkbox, Button, Input } from 'antd'
import { useState } from 'react'

import { AiOutlineHolder } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Show } from 'ui-kit'

const initialData = [
  {
    title: 'Source',
    checked: true,
    readonly: true,
    default: true,
    edit: false,
  },
  {
    title: 'Applied',
    checked: true,
    readonly: true,
    default: true,
    edit: false,
  },
  {
    title: 'Custom Round 1',
    checked: true,
    readonly: false,
    default: false,
    edit: false,
  },
  {
    title: 'Custom Round 2',
    checked: true,
    readonly: false,
    default: false,
    edit: false,
  },
  {
    title: 'Offer',
    checked: true,
    readonly: true,
    default: true,
    edit: false,
  },
  {
    title: 'Rejected',
    checked: true,
    readonly: true,
    default: true,
    edit: false,
  },
]

export default function JobPipelines() {
  const [data, setData] = useState(initialData)
  const navigate = useNavigate()

  const addRound = () => {
    const index = data.length - 2
    const element = {
      title: `Custom Round ${data.length - 3}`,
      checked: true,
      readonly: false,
      default: false,
      edit: false,
    }
    data.splice(index, 0, element)
    setData([...data])
  }

  function deleteRound(index: number) {
    if (index > -1) {
      data.splice(index, 1)
      setData([...data])
    }
  }
  return (
    <div>
      <div className="my-8">
        <p className="text-xl font-semibold">Setup Your Job Pipeline</p>
        <p className="text-sm text-gray-500">
          These default stages are essential for a seamless hiring process and
          cannot be edited. However, you can include custom steps to tailor the
          pipeline to your specific requirements.
        </p>
      </div>

      <p className="text-base font-semibold">Total Rounds - {data.length}</p>

      <div className="my-5">
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={
                item.default
                  ? ['Default']
                  : item.edit
                  ? [
                      <CloseOutlined
                        key={index}
                        onClick={() => {
                          data[index].title = ' '
                          setData([...data])
                        }}
                      />,
                      <SaveOutlined
                        key={index}
                        onClick={() => {
                          data[index].edit = false
                          setData([...data])
                        }}
                      />,
                    ]
                  : [
                      <EditOutlined
                        key={index}
                        onClick={() => {
                          data[index].edit = true
                          setData([...data])
                        }}
                      />,
                      <DeleteOutlined
                        key={index}
                        onClick={() => deleteRound(index)}
                      />,
                    ]
              }
            >
              <div className="flex w-full space-x-4">
                <div className="flex space-x-2">
                  <AiOutlineHolder className="mt-1" />

                  <Checkbox
                    disabled={item.readonly}
                    checked={item.checked}
                    onChange={() => {
                      data[index].checked = !data[index].checked
                      setData([...data])
                    }}
                  />
                </div>
                <div className="w-full ">
                  <Show
                    when={item.edit === true}
                    fallback={<span> {item.title}</span>}
                  >
                    <Input
                      bordered={false}
                      size="small"
                      value={item.title}
                      onChange={(e) => {
                        data[index].title = e.target.value
                        setData([...data])
                      }}
                      onPressEnter={() => {
                        data[index].edit = false
                        setData([...data])
                      }}
                    />
                  </Show>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <div className="flex justify-between ">
        <Button size="large" className="text-primary-500" onClick={addRound}>
          <div className="flex items-center space-x-2">
            <span>
              <PlusOutlined />
            </span>
            <span>Add New Stage</span>
          </div>
        </Button>
        <div className="space-x-4">
          <Button size="large">Cancel</Button>

          <Button
            size="large"
            type="primary"
            onClick={() => navigate('/create-job/v2/3')}
          >
            <div className="flex items-center space-x-2">
              <span>Save & Publish</span>
              <span>
                <ArrowRightOutlined />
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

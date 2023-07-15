import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Button, Input, Modal, Rate, Select } from 'antd'

import useAuth from 'hooks/use-auth'
import { DeleteOutlined } from '@ant-design/icons'
import { fetchInterviews } from 'pages/create-pipeline/queries'

import { feedbackList } from '../constants/feedback-list'

type AddFeedbackProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AddFeedback({ isOpen, onClose }: AddFeedbackProps) {
  const { user } = useAuth()
  const { jobId = '' } = useParams()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [rating, setRating] = useState<number | undefined>(undefined)

  const { data } = useQuery(['interviews', jobId], () => fetchInterviews(jobId))

  const handleSelectChange = (value: string, index: number) => {
    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions[index] = value
    setSelectedOptions(newSelectedOptions)
  }
  const handleRateChange = (value: number | undefined) => {
    setRating(value)
  }
  const handleAddOption = () => {
    setSelectedOptions([...selectedOptions, ''])
  }
  const handleDeleteOption = (index: number) => {
    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions.splice(index, 1)
    setSelectedOptions(newSelectedOptions)
  }

  return (
    <Modal
      title="Add Feedback"
      open={isOpen}
      onCancel={onClose}
      okText="Submit Feedback"
    >
      <Select
        className="w-full mt-5 mb-10"
        placeholder="Select an interview round..."
        options={data?.map(({ id, title }) => ({ value: id, label: title }))}
      />

      <p className="mb-3 text-gray-600">
        Your overall opinion for this Candidate
      </p>
      <div className="flex items-center mb-10 space-x-3">
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          🚫 Strong No
        </button>
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          👎 No
        </button>
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          👍 Yes
        </button>
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          🏆 Strong Yes
        </button>
      </div>

      <p className="text-gray-600">Provide more feedback</p>

      <hr className="my-3" />

      <div className="mb-6 space-y-3">
        {selectedOptions.map((selectedOption, index) => (
          <div key={index} className="flex items-center justify-between">
            <Select
              allowClear
              placeholder="+ Select feedback"
              className="w-64"
              onChange={(value) => handleSelectChange(value, index)}
              value={selectedOption}
            >
              {feedbackList.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
            {selectedOption && (
              <Rate
                className="mt-2"
                value={rating}
                onChange={handleRateChange}
              />
            )}

            <Button
              danger
              size="small"
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteOption(index)}
            />
          </div>
        ))}
        <button className="p-1 rounded-md" onClick={handleAddOption}>
          + Add more
        </button>
      </div>

      <div className="flex space-x-3">
        <Avatar className="flex-none" src={user?.photoURL} />
        <Input.TextArea
          rows={3}
          style={{ resize: 'none' }}
          placeholder="Add notes/feedback"
        />
      </div>
    </Modal>
  )
}

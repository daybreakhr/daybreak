import React from 'react'
import { Form, Select, DatePicker, Input } from 'antd'
import SalaryInput from './salary-input'

const AdditionalDetails = () => {
  return (
    <div className="bg-gray-50 py-5 px-5 my-4 rounded-md">
      <p className="mb-1 text-base font-semibold">Additional Details</p>
      <div className="flex space-x-8 mt-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Hire by</p>

          <Form.Item>
            <DatePicker
              size="large"
              placeholder="Onsite Coding"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Priority</p>

          <Form.Item>
            <Select size="large" placeholder="Medium" />
          </Form.Item>
        </div>
      </div>

      <div>
        <div className="flex space-x-8">
          <div className="flex">
            <p className="mb-1 font-semibold">Salary</p>
          </div>
        </div>
        <div className="flex space-x-8">
          <Form.Item className="flex-1">
            <SalaryInput />
          </Form.Item>

          <div className="text-gray-400 text-sm font-normal leading-tight mt-2">
            -to-
          </div>

          <Form.Item className="flex-1">
            <Input placeholder="max" size="large" />
          </Form.Item>
        </div>
      </div>

      <div>
        <div className="flex space-x-8">
          <div className="flex">
            <p className="mb-1 font-semibold">Referal Bonus</p>
          </div>
        </div>
        <div className="flex space-x-8">
          <Form.Item className="flex-1">
            <SalaryInput />
          </Form.Item>

          <div className="text-gray-400 text-sm font-normal leading-tight mt-2">
            -to-
          </div>

          <Form.Item className="flex-1">
            <Input placeholder="max" size="large" />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default AdditionalDetails

import React from 'react'
import { Input, Select } from 'antd'
// import { DownOutlined } from '@ant-design/icons'

const SalaryInput = () => {
  return (
    <>
      <Input.Group compact size="large">
        <Input addonBefore="$ " placeholder="min" style={{ width: '70%' }} />
        <Select
          style={{
            width: '30%',
          }}
          size="large"
          defaultValue="USD"
          placeholder="USD"
        />
      </Input.Group>
    </>
  )
}

export default SalaryInput

import { SendOutlined } from '@ant-design/icons'
import { Button, Empty, Form, Mentions } from 'antd'

export default function CandidateComment() {
  return (
    <div className="flex flex-col flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="text-lg font-semibold">Comments</p>
      <div className="flex-1">
        <div className="flex items-center justify-center h-full">
          <Empty description="No comments added yet!" />
        </div>
      </div>

      <Form className="flex items-end space-x-4">
        <Form.Item name="comment" className="flex-1" noStyle>
          <Mentions
            rows={4}
            className="p-2"
            placeholder="Write your notes here! You can refer other members using @"
          />
        </Form.Item>
        <Button type="primary" icon={<SendOutlined />}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

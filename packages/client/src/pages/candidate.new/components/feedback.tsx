import { useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import AddFeedback from './add-feedback'

export default function Feedback() {
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold">Feedback</p>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsFeedbackFormVisible(true)}
          >
            Add Feedback
          </Button>
        </div>
      </div>

      <AddFeedback
        isOpen={isFeedbackFormVisible}
        onClose={() => setIsFeedbackFormVisible(false)}
      />
    </>
  )
}

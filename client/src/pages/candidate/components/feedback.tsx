import { Avatar, Button } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { notes } from '../constants/feedback'

export default function Feedback() {
  return (
    <div className="p-4 mb-4 text-gray-800 bg-white shadow-md rounded-b-md">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Interview Feedback</p>
        <Button type="primary" icon={<AiOutlinePlus />}>
          Add Feedback
        </Button>
      </div>

      <div className="space-y-6">
        {notes.map(
          ({ id, name, photoURL, comment, title, score, createdAt }) => (
            <div key={id} className="flex items-start space-x-4">
              <Avatar className="flex-none" size="large" src={photoURL}>
                {name.charAt(0)}
              </Avatar>
              <div>
                <p className="mb-2 font-medium">{name}</p>

                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">{title}</p>
                  <p>
                    <span className="font-medium">Score:</span> {score}/10
                  </p>
                </div>

                <p className="mb-2">{comment}</p>
                <p className="text-xs text-gray-500">{createdAt}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

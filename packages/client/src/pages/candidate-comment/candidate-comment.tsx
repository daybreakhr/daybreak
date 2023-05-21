import { Button, Form, Input } from 'antd'
import { comments } from './constants/comments'

export default function CandidateComment() {
  const [form] = Form.useForm()

  return (
    <div className="p-4 text-gray-800 bg-white shadow-md rounded-b-md">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Comments</p>
      </div>

      {comments.map((comment) => (
        <>
          {comment.author === 'Me' ? (
            <div className="flex justify-end">
              <div>
                <div className="w-auto h-auto px-4 py-2 mx-4 mt-4 text-gray-700 break-words align-middle bg-gray-200 rounded-xl border-5 max-w-32">
                  <p>{comment.message}</p>
                </div>
                <div className="flex justify-end px-4 mr-1 text-gray-600 ">
                  <p>{comment.author}</p>
                  <p>- {comment.time}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div>
                <div className="w-auto h-auto px-4 py-2 mx-4 mt-4 text-gray-700 break-words align-middle bg-gray-200 rounded-xl border-5 max-w-32">
                  <p>{comment.message}</p>
                </div>
                <div className="flex justify-start px-4 ml-1 text-gray-700 ">
                  <p>{comment.author}</p>
                  <p>- {comment.time}</p>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
      <Form form={form} className="mt-4">
        <Form.Item name="comment">
          <Input placeholder="Type your comment here..." />
        </Form.Item>
      </Form>
      <div className="flex items-center justify-center">
        <Form.Item>
          <Button type="primary">Add Comment</Button>
        </Form.Item>
      </div>
    </div>
  )
}

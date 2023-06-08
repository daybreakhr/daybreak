import dayjs from 'dayjs'
import { Avatar } from 'antd'
import type { User } from 'firebase/auth'
import { useRemirror } from '@remirror/react'

import MentionEditor from './mention-editor'
import { extensions } from './create-comment'

type CommentProps = {
  content: any
  user: User
  createdAt: Date
}

export default function Comment({ content, user, createdAt }: CommentProps) {
  const { manager, state, onChange } = useRemirror({ extensions, content })

  return (
    <div className="flex space-x-4">
      <Avatar className="flex-none" src={user.photoURL}>
        {user.displayName?.charAt(0)}
      </Avatar>

      <div className="flex-1 p-4 rounded-md bg-primary-500/5">
        <div className="flex items-center space-x-4">
          <p className="font-semibold">{user.displayName}</p>
          <p className="text-xs text-gray-600">{dayjs(createdAt).fromNow()}</p>
        </div>
        <MentionEditor
          state={state}
          editable={false}
          manager={manager}
          onChange={onChange}
          className="!min-h-0 h-fit !p-0"
        />
      </div>
    </div>
  )
}

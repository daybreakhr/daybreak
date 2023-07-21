import dayjs from 'dayjs'
import { Avatar } from 'antd'
import type { User } from 'firebase/auth'
import { useRemirror } from '@remirror/react'

import useAuth from 'hooks/use-auth'
import MentionEditor from './mention-editor'
import { extensions } from './create-comment'

type CommentProps = {
  content: any
  user: User
  createdAt: Date
}

export default function Comment({ content, user, createdAt }: CommentProps) {
  const { user: currentUser } = useAuth()
  const { manager, state, onChange } = useRemirror({ extensions, content })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Avatar className="flex-none" src={user.photoURL}>
          {user.displayName?.charAt(0)}
        </Avatar>
        <p className="font-medium">
          {user.displayName} {currentUser?.uid === user.uid && '(you)'}
        </p>
        <p className="text-xs text-gray-600">{dayjs(createdAt).fromNow()}</p>
      </div>

      <div className="flex-1 p-4 rounded-md bg-gray-50 mention-editor">
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

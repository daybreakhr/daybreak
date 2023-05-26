import { Button } from 'antd'
import { useRemirror } from '@remirror/react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BulletListExtension,
  ListItemExtension,
  MentionAtomExtension,
  OrderedListExtension,
  PlaceholderExtension,
} from 'remirror/extensions'

import MentionEditor from './mention-editor'
import { createComment } from '../queries'

export const extensions = () => [
  new BulletListExtension(),
  new ListItemExtension(),
  new OrderedListExtension(),
  new MentionAtomExtension({
    extraAttributes: { type: 'user' },
    matchers: [{ name: 'at', char: '@', matchOffset: 0 }],
  }),
  new PlaceholderExtension({
    placeholder: 'Drop your notes or mention a @user',
  }),
]

export default function CreateComment() {
  const { candidateId = '' } = useParams()
  const { manager, state, onChange } = useRemirror({ extensions })

  const queryClient = useQueryClient()
  const { mutate, isLoading: isCreatingComment } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', candidateId])
      manager.view.updateState(manager.createState({ content: undefined }))
    },
  })

  function handleCreateComment() {
    mutate({ candidateId, content: state.doc.toJSON() })
  }

  return (
    <form className="space-y-2 h-42">
      <MentionEditor
        state={state}
        manager={manager}
        onChange={onChange}
        className="h-24 prose border rounded-md max-w-none"
      />

      <div className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          loading={isCreatingComment}
          onClick={handleCreateComment}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

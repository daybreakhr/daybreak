import { Button, Empty } from 'antd'
import { Remirror, ThemeProvider, useRemirror } from '@remirror/react'
import { MentionAtomExtension, PlaceholderExtension } from 'remirror/extensions'
import UserSuggestor from './components/user-suggestor'

const extensions = () => [
  new MentionAtomExtension({
    extraAttributes: { type: 'user' },
    matchers: [{ name: 'at', char: '@', matchOffset: 0 }],
  }),
  new PlaceholderExtension({
    placeholder: 'Drop your notes or mention a @user',
  }),
]

export default function CandidateComment() {
  const { manager, state } = useRemirror({ extensions })

  return (
    <div className="flex flex-col flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="text-lg font-semibold">Comments</p>
      <div className="flex-1">
        <div className="flex items-center justify-center h-full">
          <Empty description="No comments added yet!" />
        </div>
      </div>

      <div className="space-y-2 h-42">
        <ThemeProvider>
          <Remirror
            autoRender="end"
            manager={manager}
            initialContent={state}
            classNames={['h-24', 'border', 'rounded-md']}
          >
            <UserSuggestor />
          </Remirror>
        </ThemeProvider>
        <div className="flex justify-end">
          <Button type="primary">Submit</Button>
        </div>
      </div>
    </div>
  )
}

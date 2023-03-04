import * as React from 'react'
import {
  FloatingToolbar,
  ThemeProvider,
  Remirror,
  RemirrorProps,
  useRemirror,
} from '@remirror/react'
import { htmlToProsemirrorNode, prosemirrorNodeToHtml } from 'remirror'
import extensions from './extensions'
import RemirrorToolbar from './toolbar'

type RemirrorEditorProps = Omit<RemirrorProps, 'manager' | 'state'> & {
  initialContent?: string
  handleChange?: (content: string) => void
  toolbarExtra?: React.ReactNode
}

export default function RemirrorEditor({
  initialContent,
  handleChange,
  toolbarExtra,
  ...rest
}: RemirrorEditorProps) {
  const { manager, state, onChange } = useRemirror({
    extensions,
    selection: 'end',
    content: initialContent,
    stringHandler: htmlToProsemirrorNode,
  })

  return (
    <ThemeProvider>
      <Remirror
        {...rest}
        state={state}
        autoRender="end"
        manager={manager}
        onChange={(e) => {
          onChange(e)
          if (handleChange) {
            const html = prosemirrorNodeToHtml(e.state.doc)
            handleChange(html)
          }
        }}
        classNames={['prose', 'h-full', 'border', 'max-w-none']}
      >
        <div className="flex items-center justify-between">
          <RemirrorToolbar />
          {toolbarExtra}
        </div>
        <FloatingToolbar />
      </Remirror>
    </ThemeProvider>
  )
}

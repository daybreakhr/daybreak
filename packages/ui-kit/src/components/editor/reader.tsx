import * as React from 'react'
import { createEditor, Descendant } from 'slate'
import { Element, Leaf } from './components'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

type ReadOnlyEditorProps = {
  initialValue: Descendant[]
}

export default function Reader({ initialValue }: ReadOnlyEditorProps) {
  const editor = React.useMemo(() => withReact(createEditor()), [])

  const renderElement = React.useCallback(
    (initialValue: RenderElementProps) => <Element {...initialValue} />,
    [],
  )
  const renderLeaf = React.useCallback(
    (initialValue: RenderLeafProps) => <Leaf {...initialValue} />,
    [],
  )
  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        readOnly
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </Slate>
  )
}

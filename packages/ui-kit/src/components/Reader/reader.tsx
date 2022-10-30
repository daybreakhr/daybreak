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

export default function JDeditor(props: any) {
  const editor = React.useMemo(() => withReact(createEditor()), [])

  const renderElement = React.useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  )
  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )
  props = props.description
  return (
    <Slate editor={editor} value={props as Descendant[]}>
      <Editable
        readOnly
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </Slate>
  )
}

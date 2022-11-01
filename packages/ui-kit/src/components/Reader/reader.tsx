import * as React from 'react'
import { createEditor } from 'slate'
import { Element, Leaf } from './components'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import { initialValues } from './initial-values'

// type ReaderProps = {
//   initialValue?: string | number | boolean | null | undefined
// }

export default function JDeditor(initialValue: any) {
  const editor = React.useMemo(() => withReact(createEditor()), [])

  const renderElement = React.useCallback(
    (initialValue: RenderElementProps) => <Element {...initialValue} />,
    [],
  )
  const renderLeaf = React.useCallback(
    (initialValue: RenderLeafProps) => <Leaf {...initialValue} />,
    [],
  )
  initialValue = initialValue.description
  return (
    <Slate editor={editor} value={initialValue ?? initialValues}>
      <Editable
        readOnly
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </Slate>
  )
}

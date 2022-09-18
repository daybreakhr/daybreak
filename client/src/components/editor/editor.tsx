import { useCallback, useState } from 'react'
import { withHistory } from 'slate-history'
import { BaseEditor, createEditor } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  //   AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { MdOutlineLooksOne, MdOutlineLooksTwo } from 'react-icons/md'
import { initialValue } from './initial-values'
import { BlockButton, Element, Leaf, MarkButton } from './components'

export type ElementType =
  | 'paragraph'
  | 'block-quote'
  | 'bulleted-list'
  | 'heading-one'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list'

export type TextAlign = 'left' | 'center' | 'right' | 'justify'

export type CustomElement = {
  type: ElementType
  align?: TextAlign
  children: CustomText[]
}
export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export default function Editor() {
  const [editor] = useState(() => withHistory(withReact(createEditor())))
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )

  return (
    <Slate editor={editor} value={initialValue}>
      <div className="p-4 border-x border-t rounded-t bg-gray-50 space-x-3">
        <MarkButton format="bold" icon={<AiOutlineBold />} />
        <MarkButton format="italic" icon={<AiOutlineItalic />} />
        <MarkButton format="underline" icon={<AiOutlineUnderline />} />
        <BlockButton format="heading-one" icon={<MdOutlineLooksOne />} />
        <BlockButton format="heading-two" icon={<MdOutlineLooksTwo />} />
        <BlockButton format="numbered-list" icon={<AiOutlineOrderedList />} />
        <BlockButton format="bulleted-list" icon={<AiOutlineUnorderedList />} />
        {/* <MarkButton format="hyperlink" icon={<AiOutlineLink />} /> */}
      </div>
      <hr />
      <div className="prose prose-sm max-w-none">
        <Editable
          className="border-x border-b rounded-b p-4 mb-4"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </div>
    </Slate>
  )
}

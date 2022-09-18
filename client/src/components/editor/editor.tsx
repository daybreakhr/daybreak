import { useCallback, useState } from 'react'
import isHotkey from 'is-hotkey'
import { withHistory } from 'slate-history'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
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
import { CustomText } from 'types/editor'
import { toggleMark } from './utils'
import { initialValue } from './initial-values'
import { BlockButton, Element, Leaf, MarkButton } from './components'

const HOTKEYS: Record<string, keyof Omit<CustomText, 'text'>> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  //   'mod+k': 'link',
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
          spellCheck
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          className="border-x border-b rounded-b p-4 mb-4"
          placeholder="Write job description or select from templates..."
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </div>
    </Slate>
  )
}

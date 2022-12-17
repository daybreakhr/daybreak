import React, { useCallback, useState } from 'react'
import isHotkey from 'is-hotkey'
import { withHistory } from 'slate-history'
import { capitalize, groupBy } from 'lodash'
import { createEditor, Descendant } from 'slate'
import { Button, Dropdown, MenuProps } from 'antd'
import { Editable, Slate, withReact } from 'slate-react'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import type { Template } from '@prisma/client'
import { DownOutlined, MacCommandOutlined } from '@ant-design/icons'
import { MdOutlineLooksOne, MdOutlineLooksTwo } from 'react-icons/md'
import { CustomText } from '../../types/editor'
import { toggleMark } from './utils'
import { initialValues } from './initial-values'
import { BlockButton, Element, Leaf, MarkButton } from './components'

const HOTKEYS: Record<string, keyof Omit<CustomText, 'text'>> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}

type EditorProps = {
  initialValue?: Descendant[] | null
  onChange: (value: Descendant[]) => void
  templates: Template[]
}

export default function Editor({
  initialValue,
  onChange,
  templates,
}: EditorProps) {
  const [key, setKey] = useState(0)
  const [value, setValue] = useState<Descendant[]>(
    initialValue ?? initialValues,
  )
  const [editor] = useState(() => withHistory(withReact(createEditor())))

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )

  const groupByCategory = groupBy(templates, (t) => t.category)

  const items: MenuProps['items'] = Object.keys(groupByCategory).map((key) => ({
    key,
    type: 'group',
    label: capitalize(key),
    children: groupByCategory[key].map(({ title, id }) => ({
      label: title,
      key: id,
    })),
  }))

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const template = templates.find(({ id }) => id === key)
    setValue(template?.description as Descendant[])
    setKey((prev) => prev + 1)
  }

  const menuProps = { items, onClick: handleMenuClick }

  return (
    <Slate
      key={key}
      editor={editor}
      value={value}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== 'set_selection',
        )
        if (isAstChange) {
          setValue(value)
          onChange(value)
        }
      }}
    >
      <div className="flex items-center p-4 space-x-4 border-t border-b rounded-t border-x bg-gray-50">
        <MarkButton
          format="bold"
          icon={<AiOutlineBold />}
          tooltip={{
            title: 'Bold',
            icons: [<MacCommandOutlined key={'bold'} />, 'B'],
          }}
        />
        <MarkButton
          format="italic"
          icon={<AiOutlineItalic />}
          tooltip={{
            title: 'Italic',
            icons: [<MacCommandOutlined key={'italic'} />, 'I'],
          }}
        />
        <MarkButton
          format="underline"
          icon={<AiOutlineUnderline />}
          tooltip={{
            title: 'Underline',
            icons: [<MacCommandOutlined key={'underline'} />, 'U'],
          }}
        />
        <BlockButton format="heading-one" icon={<MdOutlineLooksOne />} />
        <BlockButton format="heading-two" icon={<MdOutlineLooksTwo />} />
        <BlockButton format="numbered-list" icon={<AiOutlineOrderedList />} />
        <BlockButton format="bulleted-list" icon={<AiOutlineUnorderedList />} />

        <div className="flex-1" />

        <Dropdown menu={menuProps}>
          <Button>
            Autofill using job template
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="prose max-w-none">
        <Editable
          spellCheck
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          className="p-4 mb-4 border-b rounded-b border-x"
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

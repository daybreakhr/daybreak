import { BaseEditor, Editor, Element as SlateElement, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import {
  CustomElement,
  CustomText,
  ElementType,
  TextAlign,
} from '../../types/editor'

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export function isMarkActive(
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>,
): boolean {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export function isBlockActive(
  editor: BaseEditor & ReactEditor,
  format: string,
  blockType: keyof CustomElement = 'type',
) {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  )

  return !!match
}

export function toggleMark(
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>,
) {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export function toggleBlock(
  editor: BaseEditor & ReactEditor,
  format: ElementType | TextAlign,
) {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : (format as TextAlign),
    }
  } else {
    newProperties = {
      type: isActive
        ? 'paragraph'
        : isList
        ? 'list-item'
        : (format as ElementType),
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block: CustomElement = { type: format as ElementType, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

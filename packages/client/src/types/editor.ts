import type { BaseEditor } from 'slate'
import type { ReactEditor } from 'slate-react'

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
  children: CustomText[] | CustomElement[]
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

import * as React from 'react'
import clsx from 'clsx'
import { useSlate } from 'slate-react'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  isBlockActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
} from './utils'
import { CustomText, ElementType, TextAlign } from 'types/editor'

export function Element({ attributes, children, element }: RenderElementProps) {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  active: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef(
  (
    { active, children, ...restProps }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'p-1 font-bold',
          active ? 'text-black' : 'text-gray-500',
        )}
        {...restProps}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

type MarkButtonProps = {
  format: keyof Omit<CustomText, 'text'>
  icon: React.ReactNode
}

export function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={() => toggleMark(editor, format)}
    >
      {icon}
    </Button>
  )
}

type BlockButtonProps = {
  format: ElementType | TextAlign
  icon: React.ReactNode
}

export function BlockButton({ format, icon }: BlockButtonProps) {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      )}
      onClick={() => toggleBlock(editor, format)}
    >
      {icon}
    </Button>
  )
}

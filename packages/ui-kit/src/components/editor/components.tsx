import * as React from 'react'
import clsx from 'clsx'
import { useSlate } from 'slate-react'
import { Tooltip } from 'antd'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  isBlockActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
} from './utils'
import { CustomText, ElementType, TextAlign } from '../../types/editor'
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

type TooltipProps = {
  title: string
  icons: (React.ReactNode | string)[]
}

export const TootipRenderer = ({ title, icons }: TooltipProps) => {
  return (
    <div className="px-2 text-center">
      {title}
      <div className="flex">
        {icons.map((val, index) => (
          <>
            {index > 0 && '+'}
            <div className="px-2" key={index}>
              {val}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  active: boolean
  tooltip?: TooltipProps
  children: React.ReactNode
}

export const Button = React.forwardRef(
  (
    { active, tooltip, children, ...restProps }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <Tooltip title={tooltip ? <TootipRenderer {...tooltip} /> : undefined}>
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
      </Tooltip>
    )
  },
)

Button.displayName = 'Button'

type MarkButtonProps = {
  format: keyof Omit<CustomText, 'text'>
  icon: React.ReactNode
  tooltip?: TooltipProps
}

export function MarkButton({ format, icon, tooltip }: MarkButtonProps) {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={() => toggleMark(editor, format)}
      tooltip={tooltip}
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

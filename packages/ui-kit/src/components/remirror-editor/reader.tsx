import * as React from 'react'
import { htmlToProsemirrorNode, getRemirrorJSON } from 'remirror'
import {
  Callout,
  CodeBlock,
  Doc,
  Heading,
  MarkMap,
  RemirrorRenderer,
  TextHandler,
  ThemeProvider,
  useRemirror,
} from '@remirror/react'
import extensions from './extensions'

const typeMap: MarkMap = {
  blockquote: 'blockquote',
  bulletList: 'ul',
  callout: Callout,
  codeBlock: CodeBlock,
  doc: Doc,
  hardBreak: 'br',
  heading: Heading,
  horizontalRule: 'hr',
  image: 'img',
  listItem: 'li',
  paragraph: 'p',
  orderedList: 'ol',
  text: TextHandler,
}

const markMap: MarkMap = {
  italic: 'em',
  bold: 'strong',
  code: 'code',
  underline: 'u',
}

type RemirrorReaderProps = {
  html: string
}

export default function RemirrorReader({ html }: RemirrorReaderProps) {
  const { state } = useRemirror({ extensions })

  const doc = getRemirrorJSON(
    htmlToProsemirrorNode({
      schema: state.schema,
      content: html,
    }),
  )

  return (
    <ThemeProvider className="prose">
      <RemirrorRenderer json={doc} markMap={markMap} typeMap={typeMap} />
    </ThemeProvider>
  )
}

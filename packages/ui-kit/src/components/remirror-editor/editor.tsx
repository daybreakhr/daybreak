import * as React from 'react'
import { ThemeProvider, Remirror, RemirrorProps } from '@remirror/react'

import RemirrorToolbar from './toolbar'

export default function RemirrorEditor(props: RemirrorProps) {
  return (
    <ThemeProvider>
      <Remirror
        {...props}
        classNames={['prose', 'max-w-none', ...(props.classNames ?? [])]}
      >
        <RemirrorToolbar />
      </Remirror>
    </ThemeProvider>
  )
}

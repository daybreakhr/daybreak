import {
  PlaceholderExtension,
  ReactExtensions,
  Remirror,
  ThemeProvider,
} from '@remirror/react'
import type {
  EditorState,
  RemirrorEventListener,
  RemirrorManager,
} from 'remirror'
import {
  BulletListExtension,
  ListItemExtension,
  MentionAtomExtension,
  OrderedListExtension,
} from 'remirror/extensions'
import UserSuggestor from './user-suggestor'

type Extensions = ReactExtensions<
  | PlaceholderExtension
  | MentionAtomExtension
  | ListItemExtension
  | BulletListExtension
  | OrderedListExtension
>

type MentionEditorProps = {
  className?: string
  editable?: boolean
  state: Readonly<EditorState>
  manager: RemirrorManager<Extensions>
  onChange: RemirrorEventListener<Extensions>
}

export default function MentionEditor({
  className,
  state,
  manager,
  editable = true,
  onChange,
}: MentionEditorProps) {
  return (
    <ThemeProvider>
      <Remirror
        state={state}
        manager={manager}
        autoRender="start"
        editable={editable}
        onChange={onChange}
        classNames={className?.split(' ')}
      >
        <UserSuggestor />
      </Remirror>
    </ThemeProvider>
  )
}

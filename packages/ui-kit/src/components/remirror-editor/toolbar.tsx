import * as React from 'react'
import {
  HeadingLevelButtonGroup,
  ToggleBoldButton,
  ToggleBulletListButton,
  ToggleItalicButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleUnderlineButton,
  ToggleBlockquoteButton,
  ToggleCodeButton,
  Toolbar,
} from '@remirror/react'
import Show from '../show'

export default function RemirrorToolbar({
  hideHeadingLevelButtonGroup,
}: {
  hideHeadingLevelButtonGroup?: boolean
}) {
  return (
    <Toolbar>
      <Show when={!hideHeadingLevelButtonGroup}>
        <HeadingLevelButtonGroup />
      </Show>
      <ToggleBoldButton />
      <ToggleItalicButton />
      <ToggleUnderlineButton />
      <ToggleStrikeButton />
      <ToggleOrderedListButton />
      <ToggleBulletListButton />
      <ToggleBlockquoteButton />
      <ToggleCodeButton />
    </Toolbar>
  )
}

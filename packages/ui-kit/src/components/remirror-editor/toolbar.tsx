import * as React from 'react'
import {
  HeadingLevelButtonGroup,
  ToggleBoldButton,
  ToggleBulletListButton,
  ToggleItalicButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleUnderlineButton,
  Toolbar,
} from '@remirror/react'

export default function RemirrorToolbar() {
  return (
    <Toolbar>
      <HeadingLevelButtonGroup />
      <ToggleBoldButton />
      <ToggleItalicButton />
      <ToggleUnderlineButton />
      <ToggleBulletListButton />
      <ToggleOrderedListButton />
      <ToggleStrikeButton />
    </Toolbar>
  )
}

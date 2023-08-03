import {
  Remirror,
  ThemeProvider,
  ToggleBlockquoteButton,
  ToggleBoldButton,
  ToggleBulletListButton,
  ToggleCodeButton,
  ToggleItalicButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleUnderlineButton,
  Toolbar,
  useRemirror,
} from '@remirror/react'
import {
  BoldExtension,
  ItalicExtension,
  OrderedListExtension,
  ListItemExtension,
  UnderlineExtension,
  HeadingExtension,
  BulletListExtension,
  StrikeExtension,
  CodeExtension,
  BlockquoteExtension,
  LinkExtension,
} from 'remirror/extensions'
import { htmlToProsemirrorNode } from 'remirror'

const extensions = () => [
  new BoldExtension(),
  new CodeExtension(),
  new ItalicExtension(),
  new StrikeExtension(),
  new HeadingExtension(),
  new ListItemExtension(),
  new UnderlineExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new BlockquoteExtension(),
  new LinkExtension(),
]

export default function TextEditor() {
  const { manager, state, onChange } = useRemirror({
    extensions,
    selection: 'end',
    stringHandler: htmlToProsemirrorNode,
  })

  return (
    <>
      <ThemeProvider>
        <Remirror
          autoRender="end"
          manager={manager}
          state={state}
          onChange={onChange}
          classNames={[
            'h-56',
            'prose',
            'border',
            'max-w-none',
            'border-gray-300',
          ]}
          placeholder="Enter Job Details"
        >
          <div>
            <Toolbar>
              <ToggleBoldButton />
              <ToggleItalicButton />
              <ToggleUnderlineButton />
              <ToggleStrikeButton />
              <ToggleOrderedListButton />
              <ToggleBulletListButton />
              <ToggleBlockquoteButton />
              <ToggleCodeButton />
            </Toolbar>
          </div>
        </Remirror>
      </ThemeProvider>
    </>
  )
}

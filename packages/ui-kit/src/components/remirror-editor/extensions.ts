import {
  BoldExtension,
  CodeExtension,
  ItalicExtension,
  StrikeExtension,
  HeadingExtension,
  ListItemExtension,
  UnderlineExtension,
  BulletListExtension,
  OrderedListExtension,
  BlockquoteExtension,
} from 'remirror/extensions'

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
]

export default extensions

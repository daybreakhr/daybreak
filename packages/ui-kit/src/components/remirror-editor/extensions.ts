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
]

export default extensions

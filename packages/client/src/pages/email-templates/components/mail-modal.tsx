import { Form, Input, Modal } from 'antd'
import {
  HeadingLevelButtonGroup,
  Remirror,
  ThemeProvider,
  ToggleBoldButton,
  ToggleBulletListButton,
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
} from 'remirror/extensions'
import { htmlToProsemirrorNode } from 'remirror'

type MailModalProps = {
  body: string
  title: string
  subject: string
  isOpen: boolean
  onClose: () => void
}

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

export default function MailModal({
  body,
  title,
  isOpen,
  onClose,
  subject,
}: MailModalProps) {
  const [form] = Form.useForm()

  const { manager, state, onChange } = useRemirror({
    extensions,
    content: body,
    selection: 'end',
    stringHandler: htmlToProsemirrorNode,
  })

  function handleOk() {
    form.validateFields().then(() => {})
  }

  return (
    <Modal
      width={720}
      open={isOpen}
      destroyOnClose
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
      title="Email Template"
    >
      <Form
        form={form}
        layout="vertical"
        className="py-2"
        initialValues={{ title, subject }}
      >
        <Form.Item
          label="Template Name"
          name="title"
          rules={[
            { required: true, message: 'Please enter name for this template!' },
          ]}
        >
          <Input placeholder="Write a subject for this email..." />
        </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please enter email subject!' }]}
        >
          <Input placeholder="Write a subject for this email..." />
        </Form.Item>

        <ThemeProvider>
          <Remirror
            state={state}
            autoRender="end"
            manager={manager}
            onChange={onChange}
            classNames={[
              'h-96',
              'prose',
              'border',
              'max-w-none',
              'rounded-md',
              'border-gray-300',
            ]}
            placeholder="Write email message here..."
          >
            <Toolbar>
              <HeadingLevelButtonGroup />
              <ToggleBoldButton />
              <ToggleItalicButton />
              <ToggleUnderlineButton />
              <ToggleBulletListButton />
              <ToggleOrderedListButton />
              <ToggleStrikeButton />
            </Toolbar>
          </Remirror>
        </ThemeProvider>
      </Form>
    </Modal>
  )
}

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
import { htmlToProsemirrorNode, prosemirrorNodeToHtml } from 'remirror'

import VariablesDropdown from 'components/variables-dropdown'
import { CreateTemplateDto } from '../queries'

type MailModalProps = {
  body: string
  name: string
  subject: string
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSave: (values: CreateTemplateDto) => void
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
  name,
  isOpen,
  onClose,
  subject,
  onSave,
  isLoading,
}: MailModalProps) {
  const [form] = Form.useForm()

  const { manager, state, onChange, setState } = useRemirror({
    extensions,
    content: body,
    selection: 'end',
    stringHandler: htmlToProsemirrorNode,
  })

  function handleOk() {
    form.validateFields().then((values: Omit<CreateTemplateDto, 'body'>) => {
      onSave({ ...values, body: prosemirrorNodeToHtml(state.doc) })
    })
  }

  function insertVariable(variable: string) {
    const newState = state.applyTransaction(state.tr.insertText(variable)).state
    setState(newState)
  }

  return (
    <Modal
      width={720}
      open={isOpen}
      okText="Save"
      destroyOnClose
      onOk={handleOk}
      onCancel={onClose}
      title="Email Template"
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        className="py-2"
        initialValues={{ name, subject }}
      >
        <Form.Item
          label="Template Name"
          name="name"
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
              <VariablesDropdown insertVariable={insertVariable} />
            </Toolbar>
          </Remirror>
        </ThemeProvider>
      </Form>
    </Modal>
  )
}

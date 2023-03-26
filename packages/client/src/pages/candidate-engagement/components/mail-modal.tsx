import { Form, Input, Modal } from 'antd'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { createEmailEvent } from '../queries'

type MailModalProps = {
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

export default function MailModal({ isOpen, onClose }: MailModalProps) {
  const [form] = Form.useForm()
  const { candidateId = '' } = useParams()

  const { manager, state, onChange } = useRemirror({
    extensions,
    selection: 'end',
    stringHandler: htmlToProsemirrorNode,
  })

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createEmailEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['emails', candidateId])
      onClose()
    },
  })

  function handleOk() {
    form.validateFields().then(({ subject }: { subject: string }) => {
      mutate({
        subject,
        candidateId,
        body: prosemirrorNodeToHtml(state.doc),
      })
    })
  }

  return (
    <Modal
      width={720}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      title="Send Mail to Candidate"
      okButtonProps={{ loading: isLoading }}
    >
      <Form layout="vertical" className="py-2" form={form}>
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
              'h-56',
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

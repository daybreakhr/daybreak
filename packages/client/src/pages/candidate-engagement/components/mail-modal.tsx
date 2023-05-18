import { Form, Input, Modal, Select } from 'antd'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

import { fetchEmailTemplates } from 'pages/email-templates/queries'
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

  const { manager, state } = useRemirror({
    extensions,
    selection: 'end',
    stringHandler: htmlToProsemirrorNode,
  })

  const { data: mailTemplates } = useQuery(
    ['email-templates'],
    fetchEmailTemplates,
  )

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createEmailEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['emails', candidateId])
      onClose()
    },
  })

  function handleSelection(value: string) {
    const template = mailTemplates?.find((t) => t.id === value)
    form.setFieldsValue({ subject: template?.subject ?? '' })
    manager.view.updateState(
      manager.createState({ content: template?.body ?? '' }),
    )
  }

  function handleOk() {
    form.validateFields().then(({ subject }: { subject: string }) => {
      mutate({
        subject,
        candidateId,
        body: prosemirrorNodeToHtml(manager.view.state.doc),
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
        <Form.Item label="Template" name="template">
          <Select
            showSearch
            allowClear
            placeholder="Search for a template..."
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={mailTemplates?.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
            onChange={handleSelection}
          />
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
            autoRender="end"
            manager={manager}
            initialContent={state}
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

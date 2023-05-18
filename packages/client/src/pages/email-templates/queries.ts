import { EmailTemplate } from '@prisma/client'
import { storage } from 'ui-kit'
import client from 'utils/client'

export type CreateTemplateDto = {
  name: string
  subject: string
  body: string
}

export async function fetchEmailTemplates() {
  const workspaceId = storage.get('workspaceId')
  const { data } = await client.get<EmailTemplate[]>(
    `/workspaces/${workspaceId}/email-templates`,
  )
  return data
}

export async function createEmailTemplate({
  name,
  subject,
  body,
}: CreateTemplateDto) {
  const workspaceId = storage.get('workspaceId')
  const { data } = await client.post<EmailTemplate>('/email-templates', {
    name,
    subject,
    body,
    workspaceId,
  })

  return data
}

export async function updateEmailTemplate({
  id,
  name,
  subject,
  body,
}: CreateTemplateDto & { id: string }) {
  const { data } = await client.patch<EmailTemplate>(`/email-templates/${id}`, {
    name,
    subject,
    body,
  })

  return data
}

export async function deleteEmailTemplate(id: string) {
  const { data } = await client.delete(`/email-templates/${id}`)
  return data
}

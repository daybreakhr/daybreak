import { PartialType } from '@nestjs/mapped-types'

export class CreateEmailTemplatesDto {
  name: string
  subject: string
  body: string
  workspaceId: string
}

export class EmailTemplateDto extends CreateEmailTemplatesDto {
  id: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export class UpdateEmailTemplateDto extends PartialType(
  CreateEmailTemplatesDto,
) {}

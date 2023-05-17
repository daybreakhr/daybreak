import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import {
  CreateEmailTemplatesDto,
  UpdateEmailTemplateDto,
} from './email-templates.dto'

@Injectable()
export class EmailTemplatesService {
  constructor(private prismaService: PrismaService) {}

  async createEmailTemplate(
    createEmailTemplateDto: CreateEmailTemplatesDto,
    createdBy: string,
  ) {
    const { workspaceId, ...rest } = createEmailTemplateDto

    const emailTemplate = await this.prismaService.emailTemplate.create({
      data: {
        ...rest,
        Member: { connect: { uid: createdBy } },
        Workspace: { connect: { id: workspaceId } },
      },
    })

    return emailTemplate
  }

  async updateEmailTemplate(
    id: string,
    updateEmailTemplateDto: UpdateEmailTemplateDto,
  ) {
    const emailTemplate = await this.prismaService.emailTemplate.update({
      where: { id },
      data: updateEmailTemplateDto,
    })

    return emailTemplate
  }

  async deleteEmailTemplate(id: string) {
    const emailTemplate = await this.prismaService.emailTemplate.delete({
      where: { id },
    })

    return emailTemplate
  }
}

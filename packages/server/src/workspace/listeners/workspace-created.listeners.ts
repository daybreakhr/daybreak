import { OnEvent } from '@nestjs/event-emitter'
import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import EMAIL_TEMPLATES from 'src/assets/email-templates'
import { WorkspaceCreatedEvent } from '../events/workspace-created.event'

@Injectable()
export class WorkspaceCreatedListener {
  private readonly logger = new Logger('WORKSPACE CREATED LISTENER')
  constructor(private prismaService: PrismaService) {}

  @OnEvent('workspace.created')
  async addEmailTemplatesToWorkspace(payload: WorkspaceCreatedEvent) {
    const { workspaceId, uid } = payload

    this.logger.log(`Adding email templates to workspace ${workspaceId}`)

    await this.prismaService.emailTemplate.createMany({
      data: EMAIL_TEMPLATES.map(({ name, subject, body }) => ({
        name,
        subject,
        body,
        workspaceId,
        createdBy: uid,
      })),
    })
  }
}

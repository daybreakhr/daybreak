import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { TemplatesService } from './templates.service'

@Controller(':workspaceId/templates')
@UseGuards(AuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('')
  async getAllTemplates(@Param('workspaceId') workspaceId: string) {
    const data = await this.templatesService.getAllTemplates(workspaceId)
    return data
  }
}

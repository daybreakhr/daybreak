import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { TemplatesService } from './templates.service'

@Controller('/templates')
@UseGuards(AuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('')
  async getAllTemplates() {
    const data = await this.templatesService.getAllTemplates()
    return data
  }
}

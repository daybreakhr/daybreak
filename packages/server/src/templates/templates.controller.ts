import { Controller, Get, UseGuards } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiSecurity,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { Template } from './templates.dto'
import { TemplatesService } from './templates.service'

@ApiSecurity('access-key')
@ApiTags('Template')
@Controller('templates')
@UseGuards(AuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Templates' })
  @ApiOkResponse({
    description: 'Templates were returned successfully',
    type: [Template],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAllTemplates(): Promise<Template[]> {
    const data = await this.templatesService.getAllTemplates()
    return data
  }
}

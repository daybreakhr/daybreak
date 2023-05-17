import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserRecord } from 'firebase-admin/auth'
import { GetUser } from 'src/auth/get-user.decorator'
import {
  CreateEmailTemplatesDto,
  EmailTemplateDto,
  UpdateEmailTemplateDto,
} from './email-templates.dto'
import { EmailTemplatesService } from './email-templates.service'

@ApiTags('Email Templates')
@ApiSecurity('access-key')
@Controller('email-templates')
@UseGuards(AuthGuard)
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}

  @Post('')
  @ApiBody({ type: CreateEmailTemplatesDto })
  @ApiOperation({ summary: 'Create Email Template' })
  @ApiCreatedResponse({
    description: 'Email Template created successfully',
    type: EmailTemplateDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createEmailTemplate(
    @Body() createEmailTemplateDto: CreateEmailTemplatesDto,
    @GetUser() user: UserRecord,
  ) {
    return this.emailTemplatesService.createEmailTemplate(
      createEmailTemplateDto,
      user.uid,
    )
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Email Template' })
  @ApiOkResponse({
    description: 'Email Template updated successfully',
    type: EmailTemplateDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  async updateEmailTemplate(
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: UpdateEmailTemplateDto,
  ) {
    const data = await this.emailTemplatesService.updateEmailTemplate(
      id,
      updateEmailTemplateDto,
    )
    return data
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Email Template' })
  @ApiOkResponse({
    description: 'Email Template deleted successfully',
    type: EmailTemplateDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Email Template not found' })
  async deleteEmailTemplate(@Param('id') id: string) {
    const data = await this.emailTemplatesService.deleteEmailTemplate(id)
    return data
  }
}

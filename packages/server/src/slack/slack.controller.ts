import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import type { UserRecord } from 'firebase-admin/auth'

import { AuthGuard } from 'src/auth/auth.guard'
import { MemberDto } from 'src/members/members.dto'
import { GetUser } from 'src/auth/get-user.decorator'
import isValidRequestFromSlack from 'src/utils/verify-signature'

import { SlackService } from './slack.service'

@ApiTags('Slack')
@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post('events')
  @ApiOperation({ summary: 'Slack Events' })
  async slackEvents(@Req() req: RawBodyRequest<Request>, @Body() body: any) {
    switch (body.type) {
      case 'url_verification':
        return this.slackService.verifyUrl(body)
      case 'event_callback':
        if (!isValidRequestFromSlack(req)) {
          throw new HttpException(
            { status: HttpStatus.NOT_FOUND, error: 'Invalid signing secret' },
            HttpStatus.NOT_FOUND,
          )
        } else {
          return this.slackService.handleEvent(body)
        }
    }
  }

  @Post('actions')
  @ApiOperation({ summary: 'Slack Actions' })
  async slackActions(@Body() body: any) {
    return this.slackService.handleAction(body)
  }

  @UseGuards(AuthGuard)
  @Post('uninstall')
  @ApiOperation({ operationId: 'UninstallSlack', summary: 'Uninstall Slack' })
  @ApiCreatedResponse({
    description: 'Uninstalled successfully',
    type: MemberDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async uninstallSlack(@GetUser() user: UserRecord) {
    return this.slackService.uninstallSlack(user.uid)
  }
}

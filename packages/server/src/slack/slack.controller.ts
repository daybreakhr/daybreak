import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import isVerified from 'src/utils/verify-signature'
import { SlackService } from './slack.service'

@ApiTags('Slack')
@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post('events')
  @ApiOperation({ summary: 'Slack Events' })
  async slackEvents(@Req() req: Request, @Body() body: any) {
    switch (body.type) {
      case 'url_verification':
        return this.slackService.verifyUrl(body)
      case 'event_callback':
        if (!isVerified(req)) {
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
}

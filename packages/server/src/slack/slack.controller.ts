import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post } from '@nestjs/common'
import { SlackService } from './slack.service'

@ApiTags('Slack')
@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post('events')
  @ApiOperation({ summary: 'Slack Events' })
  async slackEvents(@Body() body: any) {
    switch (body.type) {
      case 'url_verification':
        return this.slackService.verifyUrl(body)
      case 'event_callback':
        return this.slackService.handleEvent(body)
    }
  }

  @Post('actions')
  @ApiOperation({ summary: 'Slack Actions' })
  async slackActions(@Body() body: any) {
    return this.slackService.handleAction(body)
  }
}

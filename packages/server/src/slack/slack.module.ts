import { Module } from '@nestjs/common'
import { SlackService } from './slack.service'
import { SlackController } from './slack.controller'
import { SlackViews } from './slack.views'

@Module({
  controllers: [SlackController],
  providers: [SlackService, SlackViews],
})
export class SlackModule {}

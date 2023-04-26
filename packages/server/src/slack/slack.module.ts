import { Module } from '@nestjs/common'
import { AWSModule } from 'src/aws/aws.module'
import { PrismaService } from 'src/prisma.service'
import { ReferralService } from 'src/referral/referral.service'
import { SlackService } from './slack.service'
import { SlackController } from './slack.controller'
import { SlackViews } from './slack.views'

@Module({
  imports: [AWSModule],
  controllers: [SlackController],
  providers: [SlackService, SlackViews, PrismaService, ReferralService],
})
export class SlackModule {}

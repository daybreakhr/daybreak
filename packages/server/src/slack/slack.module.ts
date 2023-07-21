import { Module } from '@nestjs/common'
import { AWSModule } from 'src/aws/aws.module'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { AffindaModule } from 'src/affinda/affinda.module'
import { ReferralService } from 'src/referral/referral.service'
import { CandidateModule } from 'src/candidate/candidate.module'

import { SlackViews } from './slack.views'
import { SlackService } from './slack.service'
import { SlackController } from './slack.controller'

@Module({
  imports: [AffindaModule, AWSModule, AuthModule, CandidateModule],
  controllers: [SlackController],
  providers: [SlackService, SlackViews, PrismaService, ReferralService],
  exports: [SlackService],
})
export class SlackModule {}

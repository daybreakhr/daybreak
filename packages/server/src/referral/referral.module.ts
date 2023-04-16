import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReferralService } from './referral.service'

@Module({
  providers: [ReferralService, PrismaService],
})
export class ReferralsModule {}

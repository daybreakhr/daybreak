import { Module } from '@nestjs/common'

import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { InterviewController } from './interview.controller'
import { InterviewService } from './interview.service'

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [InterviewController],
  providers: [InterviewService, PrismaService],
})
export class InterviewModule {}

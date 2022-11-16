import { Module } from '@nestjs/common'
import { FeedbackService } from './feedback.service'
import { FeedbackController } from './feedback.controller'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'

@Module({
  imports: [FirebaseModule],
  controllers: [FeedbackController],
  providers: [AuthService, FeedbackService, PrismaService],
})
export class FeedbackModule {}

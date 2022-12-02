import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { FeedbackController } from './feedback.controller'
import { FeedbackService } from './feedback.service'

@Module({
  imports: [FirebaseModule],
  controllers: [FeedbackController],
  providers: [AuthService, FeedbackService, PrismaService],
})
export class FeedbackModule {}

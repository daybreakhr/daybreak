import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { InterviewController } from './interview.controller'
import { InterviewService } from './interview.service'

@Module({
  imports: [FirebaseModule],
  controllers: [InterviewController],
  providers: [InterviewService, PrismaService, AuthService],
})
export class TemplatesModule {}

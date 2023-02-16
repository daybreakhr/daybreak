import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { GoogleModule } from 'src/google/google.module'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'

@Module({
  imports: [FirebaseModule, GoogleModule],
  controllers: [EmailController],
  providers: [AuthService, EmailService, PrismaService],
})
export class EmailModule {}

import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { GoogleModule } from 'src/google/google.module'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'

@Module({
  imports: [AuthModule, FirebaseModule, GoogleModule],
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
})
export class EmailModule {}

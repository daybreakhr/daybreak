import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'

import { EmailTemplatesService } from './email-templates.service'
import { EmailTemplatesController } from './email-templates.controller'

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [EmailTemplatesController],
  providers: [EmailTemplatesService, PrismaService],
})
export class EmailTemplatesModule {}

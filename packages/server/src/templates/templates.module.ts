import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { AWSModule } from 'src/aws/aws.module'
import { InvitesService } from 'src/invites/invites.service'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'

@Module({
  imports: [FirebaseModule, AWSModule],
  controllers: [TemplatesController],
  providers: [TemplatesService, AuthService, PrismaService, InvitesService],
})
export class TemplatesModule {}

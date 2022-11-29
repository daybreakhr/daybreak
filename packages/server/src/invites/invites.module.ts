import { Module } from '@nestjs/common'
import { InvitesService } from './invites.service'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AWSModule } from 'src/aws/aws.module'
import { InvitesController } from './invites.controller'

@Module({
  imports: [FirebaseModule, AWSModule],
  providers: [InvitesService, PrismaService, AuthService],
  controllers: [InvitesController],
  exports: [InvitesService],
})
export class InvitesModule {}

import { Module } from '@nestjs/common'
import { MembersService } from './members.service'
import { MembersController } from './members.controller'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { AWSModule } from 'src/aws/aws.module'
import { InvitesService } from 'src/invites/invites.service'

@Module({
  imports: [FirebaseModule, AWSModule],
  controllers: [MembersController],
  providers: [MembersService, AuthService, PrismaService, InvitesService],
})
export class MembersModule {}

import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { NotificationModule } from 'src/notification/notification.module'
import { InvitesService } from './invites.service'
import { InvitesController } from './invites.controller'

@Module({
  imports: [FirebaseModule, NotificationModule],
  providers: [InvitesService, PrismaService, AuthService],
  controllers: [InvitesController],
  exports: [InvitesService],
})
export class InvitesModule {}

import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { NotificationModule } from 'src/notification/notification.module'
import { InvitesService } from './invites.service'
import { InvitesController } from './invites.controller'

@Module({
  imports: [AuthModule, FirebaseModule, NotificationModule],
  providers: [InvitesService, PrismaService],
  controllers: [InvitesController],
  exports: [InvitesService],
})
export class InvitesModule {}

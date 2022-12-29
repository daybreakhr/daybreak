import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { AWSModule } from 'src/aws/aws.module'
import { NotificationService } from 'src/notification/notification.service'
import { AffindaModule } from 'src/affinda/affinda.module'
import { MembersController } from './members.controller'
import { MembersService } from './members.service'

@Module({
  imports: [FirebaseModule, AWSModule, AffindaModule],
  controllers: [MembersController],
  providers: [MembersService, AuthService, PrismaService, NotificationService],
})
export class MembersModule {}

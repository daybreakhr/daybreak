import { Module } from '@nestjs/common'
import { MembersService } from './members.service'
import { MembersController } from './members.controller'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { SesService } from 'src/ses.service'

@Module({
  imports: [FirebaseModule],
  controllers: [MembersController],
  providers: [MembersService, AuthService, PrismaService, SesService],
})
export class MembersModule {}

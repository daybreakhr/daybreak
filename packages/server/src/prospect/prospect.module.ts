import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { ProspectController } from './prospect.controller'
import { ProspectService } from './prospect.service'

@Module({
  imports: [FirebaseModule],
  controllers: [ProspectController],
  providers: [AuthService, ProspectService, PrismaService],
})
export class ProspectModule {}

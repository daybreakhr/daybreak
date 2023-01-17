import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AffindaModule } from 'src/affinda/affinda.module'
import { ProspectController } from './prospect.controller'
import { ProspectService } from './prospect.service'

@Module({
  imports: [FirebaseModule, AffindaModule],
  controllers: [ProspectController],
  providers: [AuthService, ProspectService, PrismaService],
})
export class ProspectModule {}

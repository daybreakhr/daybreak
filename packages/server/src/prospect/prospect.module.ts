import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AffindaModule } from 'src/affinda/affinda.module'
import { AWSModule } from 'src/aws/aws.module'
import { ProspectController } from './prospect.controller'
import { ProspectService } from './prospect.service'

@Module({
  imports: [AuthModule, FirebaseModule, AWSModule, AffindaModule],
  controllers: [ProspectController],
  providers: [ProspectService, PrismaService],
})
export class ProspectModule {}

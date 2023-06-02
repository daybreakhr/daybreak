import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { AWSModule } from 'src/aws/aws.module'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { AffindaService } from 'src/affinda/affinda.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { NotificationModule } from 'src/notification/notification.module'

import { CandidateService } from './candidate.service'
import { CandidateController } from './candidate.controller'

@Module({
  imports: [FirebaseModule, AWSModule, HttpModule, NotificationModule],
  controllers: [CandidateController],
  providers: [AffindaService, CandidateService, AuthService, PrismaService],
  exports: [CandidateService],
})
export class CandidateModule {}

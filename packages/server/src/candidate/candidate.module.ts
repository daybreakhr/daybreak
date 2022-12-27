import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { HttpModule } from '@nestjs/axios'
import { AWSModule } from 'src/aws/aws.module'
import { CandidateController } from './candidate.controller'
import { CandidateService } from './candidate.service'

@Module({
  imports: [FirebaseModule, AWSModule, HttpModule],
  controllers: [CandidateController],
  providers: [CandidateService, AuthService, PrismaService],
})
export class CandidateModule {}

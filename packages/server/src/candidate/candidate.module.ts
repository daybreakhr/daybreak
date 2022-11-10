import { Module } from '@nestjs/common'
import { CandidateService } from './candidate.service'
import { CandidateController } from './candidate.controller'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AWSModule } from 'src/aws/aws.module'

@Module({
  imports: [FirebaseModule, AWSModule],
  controllers: [CandidateController],
  providers: [CandidateService, AuthService, PrismaService],
})
export class CandidateModule {}

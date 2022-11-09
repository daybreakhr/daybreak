import { Module } from '@nestjs/common'
import { CandidateService } from './candidate.service'
import { CandidateController } from './candidate.controller'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AWSS3Service } from 'src/aws/aws.s3.service'

@Module({
  imports: [FirebaseModule],
  controllers: [CandidateController],
  providers: [CandidateService, AuthService, PrismaService, AWSS3Service],
})
export class CandidateModule {}

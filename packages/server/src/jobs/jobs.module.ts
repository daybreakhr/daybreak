import { Module } from '@nestjs/common'
import { AffindaModule } from 'src/affinda/affinda.module'
import { AuthService } from 'src/auth/auth.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { JobsController } from './jobs.controller'
import { JobsService } from './jobs.service'

@Module({
  imports: [FirebaseModule, AffindaModule],
  controllers: [JobsController],
  providers: [AWSS3Service, JobsService, AuthService, PrismaService],
})
export class JobsModule {}

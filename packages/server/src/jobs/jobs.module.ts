import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { AffindaModule } from 'src/affinda/affinda.module'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { JobsController } from './jobs.controller'
import { JobsService } from './jobs.service'

@Module({
  imports: [AuthModule, FirebaseModule, AffindaModule],
  controllers: [JobsController],
  providers: [AWSS3Service, JobsService, PrismaService],
})
export class JobsModule {}

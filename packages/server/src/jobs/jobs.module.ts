import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { AffindaModule } from 'src/affinda/affinda.module'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { SlackModule } from 'src/slack/slack.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { JobsController } from './jobs.controller'
import { JobsService } from './jobs.service'
import { JobPublishedListener } from './listeners/job-published.listeners'

@Module({
  imports: [AuthModule, FirebaseModule, AffindaModule, SlackModule],
  controllers: [JobsController],
  providers: [AWSS3Service, JobsService, PrismaService, JobPublishedListener],
})
export class JobsModule {}

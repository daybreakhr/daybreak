import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { IamService } from './aws.iam.service'
import { AWSS3Service } from './aws.s3.service'
import { AWSSESService } from './aws.ses.service'

@Module({
  providers: [AWSS3Service, AWSSESService, IamService, PrismaService],
  exports: [AWSS3Service, AWSSESService],
})
export class AWSModule {}

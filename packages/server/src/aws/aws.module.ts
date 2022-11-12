import { Module } from '@nestjs/common'
import { AWSS3Service } from './aws.s3.service'
import { AWSSESService } from './aws.ses.service'

@Module({
  providers: [AWSS3Service, AWSSESService],
  exports: [AWSS3Service, AWSSESService],
})
export class AWSModule {}

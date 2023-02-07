import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { GCalService } from './calendar.service'
import { GmailService } from './gmail.service'

@Module({
  imports: [HttpModule],
  providers: [GCalService, GmailService],
  exports: [GCalService, GmailService],
})
export class GoogleModule {}

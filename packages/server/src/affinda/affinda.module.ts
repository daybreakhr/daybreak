import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AffindaService } from './affinda.service'

@Module({
  imports: [HttpModule],
  providers: [AffindaService],
  exports: [AffindaService],
})
export class AffindaModule {}

import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { PipelineController } from './pipeline.controller'
import { PipelineService } from './pipeline.service'

@Module({
  imports: [FirebaseModule],
  controllers: [PipelineController],
  providers: [PipelineService, PrismaService, AuthService],
})
export class PipelineModule {}

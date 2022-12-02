import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { JobsController } from './jobs.controller'
import { JobsService } from './jobs.service'

@Module({
  imports: [FirebaseModule],
  controllers: [JobsController],
  providers: [JobsService, AuthService, PrismaService],
})
export class JobsModule {}

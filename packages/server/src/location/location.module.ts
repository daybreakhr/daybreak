import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [LocationController],
  providers: [LocationService, PrismaService],
})
export class LocationModule {}

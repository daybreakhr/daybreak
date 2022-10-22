import { Module } from '@nestjs/common'
import { LocationService } from './location.service'
import { LocationController } from './location.controller'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AuthService } from 'src/auth/auth.service'

@Module({
  imports: [FirebaseModule],
  controllers: [LocationController],
  providers: [AuthService, LocationService, PrismaService],
})
export class LocationModule {}

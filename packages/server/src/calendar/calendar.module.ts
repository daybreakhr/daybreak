import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { GoogleModule } from 'src/google/google.module'
import { CalendarService } from './calendar.service'
import { CalendarController } from './calendar.controller'

@Module({
  imports: [FirebaseModule, GoogleModule],
  controllers: [CalendarController],
  providers: [AuthService, CalendarService, PrismaService],
})
export class CalendarModule {}

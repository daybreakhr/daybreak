import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { CalendarService } from './calendar.service'
import { CalendarController } from './calendar.controller'

@Module({
  imports: [FirebaseModule],
  controllers: [CalendarController],
  providers: [AuthService, CalendarService, PrismaService],
})
export class CalendarModule {}

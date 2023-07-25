import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PrismaService } from 'src/prisma.service'
import { SlackModule } from 'src/slack/slack.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SlackInstalledListener } from './listeners/slack-installed.listeners'

@Module({
  imports: [FirebaseModule, HttpModule, SlackModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, SlackInstalledListener],
  exports: [AuthService],
})
export class AuthModule {}

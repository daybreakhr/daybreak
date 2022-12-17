import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'

@Module({
  imports: [FirebaseModule],
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService, AuthService],
})
export class TemplatesModule {}

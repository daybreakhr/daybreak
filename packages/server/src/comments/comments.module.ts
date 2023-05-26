import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}

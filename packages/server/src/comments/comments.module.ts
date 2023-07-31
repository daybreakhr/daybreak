import { Module } from '@nestjs/common'
import { AWSModule } from 'src/aws/aws.module'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { CommentCreatedListener } from './listeners/comment-created.listeners'

@Module({
  imports: [AuthModule, FirebaseModule, AWSModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, CommentCreatedListener],
})
export class CommentsModule {}

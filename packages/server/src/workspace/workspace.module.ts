import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AWSModule } from 'src/aws/aws.module'
import { WorkspaceController } from './workspace.controller'
import { WorkspaceService } from './workspace.service'

@Module({
  imports: [AuthModule, FirebaseModule, AWSModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, PrismaService],
})
export class WorkspaceModule {}

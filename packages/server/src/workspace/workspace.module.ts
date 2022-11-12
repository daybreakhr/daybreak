import { Module } from '@nestjs/common'
import { WorkspaceService } from './workspace.service'
import { WorkspaceController } from './workspace.controller'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { AWSModule } from 'src/aws/aws.module'

@Module({
  imports: [FirebaseModule, AWSModule],
  controllers: [WorkspaceController],
  providers: [AuthService, WorkspaceService, PrismaService],
})
export class WorkspaceModule {}

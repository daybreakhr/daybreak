import { Module } from '@nestjs/common'
import { AWSModule } from 'src/aws/aws.module'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma.service'
import { WorkspaceController } from './workspace.controller'
import { WorkspaceService } from './workspace.service'
import { WorkspaceCreatedListener } from './listeners/workspace-created.listeners'

@Module({
  imports: [AuthModule, AWSModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, PrismaService, WorkspaceCreatedListener],
})
export class WorkspaceModule {}

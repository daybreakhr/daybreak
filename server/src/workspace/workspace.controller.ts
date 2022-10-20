import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { Role, Workspace } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { WorkspaceService } from './workspace.service'

@Controller('workspace')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get(':workspaceId')
  async getById(@Param('workspaceId') id: string) {
    const data = await this.workspaceService.getById(id)
    return data
  }

  @Patch(':workspaceId')
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor('file'))
  async updateWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Body() updateWorkspaceDto: Partial<Workspace>,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    const data = await this.workspaceService.updateWorkspace(
      workspaceId,
      updateWorkspaceDto,
      file,
    )
    return data
  }
}

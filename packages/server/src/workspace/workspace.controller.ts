import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
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
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('')
  async getAllWorkspaces(@Query('slug') slug: string, @Query('id') id: string) {
    const data = await this.workspaceService.getBySlugOrId(slug, id)
    return data
  }

  @Post(':workspaceId/upload')
  @UseGuards(AuthGuard)
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @Param('workspaceId') workspaceId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const data = await this.workspaceService.uploadLogo(workspaceId, file)
    return data
  }

  @Patch(':workspaceId')
  @UseGuards(AuthGuard)
  @Roles(Role.admin)
  async updateWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Body() updateWorkspaceDto: Partial<Workspace>,
  ) {
    const data = await this.workspaceService.updateWorkspace(
      workspaceId,
      updateWorkspaceDto,
    )
    return data
  }
}

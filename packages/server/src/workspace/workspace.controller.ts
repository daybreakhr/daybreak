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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { Role, Workspace } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { GetUser } from 'src/auth/get-user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { WorkspaceService } from './workspace.service'
import { CreateWorkspaceDto } from './workspace.dto'

@ApiTags('Workspace')
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all workspaces',
    description:
      'Get list of all workspaces. You can also fetch a workspace by id or slug using search params',
  })
  @ApiOkResponse({
    description: 'Fetched workspace successfully',
    type: [CreateWorkspaceDto],
  })
  async getAllWorkspaces(
    @Query('slug') slug?: string,
    @Query('id') id?: string,
  ) {
    const data = await this.workspaceService.getBySlugOrId(slug, id)
    return data
  }

  @Post('/verify-slug')
  @ApiOperation({
    summary: 'Verify slugs exits or not',
    description:
      'Returns a boolean value based on whether the slug exists or not',
  })
  @ApiCreatedResponse({
    description: 'Successfully verified the slug',
  })
  async verifySlugExists(@Body() { slug }: { slug: string }) {
    const slugExists = this.workspaceService.verifySlug(slug)
    return slugExists
  }

  @Post('')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({ summary: 'Create a Workspace' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateWorkspaceDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @GetUser() user: UserRecord,
  ) {
    const data = await this.workspaceService.createWorkspace(
      createWorkspaceDto,
      user.uid,
    )
    return data
  }

  @Post(':workspaceId/upload')
  @UseGuards(AuthGuard)
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiSecurity('access-key')
  @ApiOperation({ summary: 'Upload logo for workspace' })
  @ApiCreatedResponse({
    description: 'Logo uploaded succesfully',
    type: CreateWorkspaceDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
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
  @ApiSecurity('access-key')
  @ApiOperation({ summary: 'Update workspace' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Location not found' })
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

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

import { JobDto } from 'src/jobs/jobs.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { GetUser } from 'src/auth/get-user.decorator'
import { CandidateDto } from 'src/candidate/candidate.dto'
import { DepartmentDto } from 'src/department/department.dto'
import { LocationDto } from 'src/location/location.dto'

import { WorkspaceService } from './workspace.service'
import { CreateWorkspaceDto } from './workspace.dto'

@ApiTags('Workspace')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('')
  @ApiOperation({
    operationId: 'GetAllWorkspaces',
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

  @Get(':workspaceId/candidates')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetCandidatesForWorkspace',
    summary: 'Get all candidates for a workspace',
  })
  @ApiOkResponse({
    description: 'Fetched candidates successfully',
    type: [CandidateDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getCandidatesForWorkspace(@Param('workspaceId') workspaceId: string) {
    const data = await this.workspaceService.getCandidatesForWorkspace(
      workspaceId,
    )
    return data
  }

  @Get(':workspaceId/departments')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetDepartmentsForWorkspace',
    summary: 'Get all departments for a workspace',
  })
  @ApiOkResponse({
    description: 'Fetched departments successfully',
    type: [DepartmentDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getDepartmentsForWorkspace(@Param('workspaceId') workspaceId: string) {
    const data = await this.workspaceService.getDepartmentsForWorkspace(
      workspaceId,
    )
    return data
  }

  @Get(':workspaceId/jobs')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetJobsForWorkspace',
    summary: 'Get all jobs for a workspace',
  })
  @ApiOkResponse({
    description: 'Fetched jobs successfully',
    type: [JobDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getJobsForWorkspace(@Param('workspaceId') workspaceId: string) {
    const data = await this.workspaceService.getJobsForWorkspace(workspaceId)
    return data
  }

  @Get(':workspaceId/locations')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetLocationsForWorkspace',
    summary: 'Get all locations for a workspace',
  })
  @ApiOkResponse({
    description: 'Fetched locations successfully',
    type: [LocationDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getLocationsForWorkspace(@Param('workspaceId') workspaceId: string) {
    const data = await this.workspaceService.getLocationsForWorkspace(
      workspaceId,
    )
    return data
  }

  @Post('/verify-slug')
  @ApiOperation({
    operationId: 'VerifySlug',
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
  @ApiOperation({
    operationId: 'CreateWorkspace',
    summary: 'Create a Workspace',
  })
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
  @ApiOperation({
    operationId: 'UploadWorkspaceLogo',
    summary: 'Upload logo for workspace',
  })
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
  @ApiOperation({ operationId: 'UpdateWorkspace', summary: 'Update workspace' })
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

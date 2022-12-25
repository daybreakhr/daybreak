import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiSecurity,
} from '@nestjs/swagger'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import { Job, UpdateJob } from './jobs.dto'
import { JobsService } from './jobs.service'

@ApiTags('Job')
@Controller('')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'Get all Jobs' })
  @ApiOkResponse({
    description: 'Jobs were returned successfully',
    type: [Job],
  })
  async getAllJobs(): Promise<Job[]> {
    const data = await this.jobsService.getAllJobs()
    return data
  }

  @Get(':workspaceId/jobs')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({ summary: 'Get all Jobs By Workspace' })
  @ApiOkResponse({
    description: 'Jobs were returned successfully',
    type: [Job],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAllByWorkspaceId(
    @Param('workspaceId') workspaceId: string,
  ): Promise<Job[]> {
    const data = await this.jobsService.getAllByWorkspaceId(workspaceId)
    return data
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get Job' })
  @ApiOkResponse({
    description: 'job returned successfully',
    type: Job,
  })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async getById(@Param('id') id: string): Promise<Job> {
    const data = await this.jobsService.getById(id)
    return data
  }

  @Post(':workspaceId/jobs')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({ summary: 'Create a job' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Job })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(
    @Param('workspaceId') workspaceId: string,
    @GetUser() user: UserRecord,
  ): Promise<Job> {
    const data = await this.jobsService.create(workspaceId, user.uid)
    return data
  }

  @Patch(':workspaceId/jobs/:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({ summary: 'Update job' })
  @ApiOkResponse({
    description: 'job updated successfully',
    type: Job,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiBody({ type: UpdateJob })
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJob,
  ): Promise<Job> {
    const data = await this.jobsService.update(id, updateJobDto)
    return data
  }
}

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
import { PipelineDto } from 'src/pipelines/pipeline.dto'
import { Job, UpdateJob } from './jobs.dto'
import { JobsService } from './jobs.service'

@ApiTags('Job')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('')
  @ApiOperation({ operationId: 'GetAllJobs', summary: 'Get all Jobs' })
  @ApiOkResponse({
    description: 'Jobs were returned successfully',
    type: [Job],
  })
  async getAllJobs(): Promise<Job[]> {
    const data = await this.jobsService.getAllJobs()
    return data
  }

  @Get(':id')
  @ApiOperation({ operationId: 'GetJobById', summary: 'Get a Job by jobId' })
  @ApiOkResponse({
    description: 'job returned successfully',
    type: Job,
  })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async getById(@Param('id') id: string): Promise<Job> {
    const data = await this.jobsService.getById(id)
    return data
  }

  @Get(':id/pipeline')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetPipelineByJobId',
    summary: 'Get Pipeline for a job',
  })
  @ApiOkResponse({
    description: 'pipeline returned successfully',
    type: PipelineDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getPipelineByJobId(@Param('id') jobId: string) {
    const data = await this.jobsService.getPipelineByJobId(jobId)
    return data
  }

  @Post('')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({ operationId: 'CreateJob', summary: 'Create a job' })
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

  @Post(':id/generate')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GenerateJdByJobId',
    summary: 'Generate job description for a job',
  })
  @ApiCreatedResponse({
    description: 'Created job description succesfully',
    type: String,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async generateDescription(@Body() { jobTitle }: { jobTitle: string }) {
    const data = await this.jobsService.generateJobDescription(jobTitle)
    return data
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({ operationId: 'UpdateJob', summary: 'Update job' })
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

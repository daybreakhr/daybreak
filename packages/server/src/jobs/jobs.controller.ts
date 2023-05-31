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
import { AuthGuard } from 'src/auth/auth.guard'
import { UserRecord } from 'firebase-admin/auth'
import { Roles } from 'src/auth/roles.decorator'
import { GetUser } from 'src/auth/get-user.decorator'
import { CandidateDto } from 'src/candidate/candidate.dto'
import { InterviewDto } from 'src/interviews/interview.dto'
import { CreateJobDto, JobDto, UpdateJob } from './jobs.dto'
import { JobsService } from './jobs.service'

@ApiTags('Job')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('')
  @ApiOperation({ operationId: 'GetAllJobs', summary: 'Get all Jobs' })
  @ApiOkResponse({
    description: 'Jobs were returned successfully',
    type: [JobDto],
  })
  async getAllJobs() {
    const data = await this.jobsService.getAllJobs()
    return data
  }

  @Get(':id')
  @ApiOperation({ operationId: 'GetJobById', summary: 'Get a Job by jobId' })
  @ApiOkResponse({
    description: 'job returned successfully',
    type: JobDto,
  })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async getById(@Param('id') id: string) {
    const data = await this.jobsService.getById(id)
    return data
  }

  @Get(':id/candidates')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetCandidatesByJobId',
    summary: 'Get Candidates for a job',
  })
  @ApiOkResponse({
    description: 'candidates returned successfully',
    type: [CandidateDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getCandidatesByJobId(@Param('id') jobId: string) {
    const data = await this.jobsService.getCandidatesByJobId(jobId)
    return data
  }

  @Get(':id/interviews')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'GetInterviewsByJobId',
    summary: 'Get Interviews for a job',
  })
  @ApiOkResponse({
    description: 'interviews returned successfully',
    type: [InterviewDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getPipelineByJobId(@Param('id') jobId: string) {
    const data = await this.jobsService.getInterviewsByJobId(jobId)
    return data
  }

  @Post('')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiBody({ type: CreateJobDto })
  @ApiOperation({ operationId: 'CreateJob', summary: 'Create a job' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: JobDto })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(
    @Body() createJobDto: CreateJobDto,
    @GetUser() user: UserRecord,
  ) {
    const data = await this.jobsService.create(createJobDto, user.uid)
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

  @Post(':id/parse')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({
    operationId: 'ParseJdByJobId',
    summary: 'Parse job using affinda',
  })
  @ApiCreatedResponse({
    type: JobDto,
    description: 'Created job description succesfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async parseDescription(@Param('id') jobId: string) {
    const data = await this.jobsService.parseJobDescription(jobId)
    return data
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiSecurity('access-key')
  @ApiOperation({ operationId: 'UpdateJob', summary: 'Update job' })
  @ApiOkResponse({
    description: 'job updated successfully',
    type: JobDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiBody({ type: UpdateJob })
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJob) {
    const data = await this.jobsService.update(id, updateJobDto)
    return data
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Job } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import { JobsService } from './jobs.service'

@Controller('')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('jobs')
  async getAllJobs() {
    const data = await this.jobsService.getAllJobs()
    return data
  }

  @Get(':workspaceId/jobs')
  @UseGuards(AuthGuard)
  async getAllByWorkspaceId(@Param('workspaceId') workspaceId: string) {
    const data = await this.jobsService.getAllByWorkspaceId(workspaceId)
    return data
  }

  @Get('jobs/:id')
  async getById(@Param('id') id: string) {
    const data = await this.jobsService.getById(id)
    return data
  }

  @Post(':workspaceId/jobs')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async create(
    @Param('workspaceId') workspaceId: string,
    @GetUser() user: UserRecord,
  ) {
    const data = await this.jobsService.create(workspaceId, user.uid)
    return data
  }

  @Patch(':workspaceId/jobs/:id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateJobDto: Partial<Job>) {
    const data = await this.jobsService.update(id, updateJobDto)
    return data
  }
}

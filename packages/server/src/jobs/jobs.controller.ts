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

@Controller(':workspaceId/jobs')
@UseGuards(AuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('')
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.jobsService.getAll(workspaceId)
    return data
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.jobsService.getById(id)
    return data
  }

  @Post('')
  @Roles('admin')
  async create(
    @Param('workspaceId') workspaceId: string,
    @GetUser() user: UserRecord,
  ) {
    const data = await this.jobsService.create(workspaceId, user.uid)
    return data
  }

  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateJobDto: Partial<Job>) {
    const data = await this.jobsService.update(id, updateJobDto)
    return data
  }
}

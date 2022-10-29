import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Job } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class JobsService {
  constructor(private prismaService: PrismaService) {}

  async getAllJobs() {
    const jobs = await this.prismaService.job.findMany({
      where: { isPublished: true },
      include: { Workspace: true },
    })
    return jobs
  }

  async getAllByWorkspaceId(workspaceId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: { workspaceId },
      include: { Location: true, Department: true },
    })
    return jobs
  }

  async getById(id: string) {
    const job = await this.prismaService.job.findUnique({
      where: { id },
      include: { Location: true, Workspace: true },
    })
    return job
  }

  async create(workspaceId: string, uid: string) {
    const job = await this.prismaService.job.create({
      data: {
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid } },
      },
    })
    return job
  }

  async update(jobId: string, updateJobDto: Partial<Job>) {
    if (updateJobDto) {
      const job = await this.prismaService.job.update({
        where: { id: jobId },
        data: updateJobDto,
      })
      return job
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Request body is not available',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}

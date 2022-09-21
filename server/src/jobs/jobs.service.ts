import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class JobsService {
  constructor(private prismaService: PrismaService) {}

  async getAll(workspaceId: string) {
    const jobs = await this.prismaService.jobs.findMany({
      where: { workspaceId },
    })
    return jobs
  }

  async getById(id: string) {
    const job = await this.prismaService.jobs.findUnique({ where: { id } })
    return job
  }

  async create(workspaceId: string, uid: string) {
    const job = await this.prismaService.jobs.create({
      data: {
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid } },
      },
    })
    return job
  }
}

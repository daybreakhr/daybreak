import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class JobsService {
  constructor(private prismaService: PrismaService) {}

  async getAll(workspaceId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: { workspaceId },
      include: { Location: true, Department: true },
    })
    return jobs
  }

  async getById(id: string) {
    const job = await this.prismaService.job.findUnique({ where: { id } })
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
}

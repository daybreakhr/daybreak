import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCandidateDto } from './candidate.dto'

@Injectable()
export class CandidateService {
  constructor(private prismaService: PrismaService) {}

  async getAll(workspaceId: string) {
    const candidates = await this.prismaService.candidate.findMany({
      where: { workspaceId },
    })

    return candidates
  }

  async getById(id: string) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
    })
    return candidate
  }

  async create(workspaceId: string, createCandidateDto: CreateCandidateDto) {
    const { jobId, ...restParams } = createCandidateDto

    const data = await this.prismaService.candidate.create({
      data: {
        ...restParams,
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
    })
    return data
  }
}

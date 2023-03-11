import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreatePipelineDto, UpdatePipelineDto } from './pipeline.dto'

@Injectable()
export class PipelineService {
  constructor(private prismaService: PrismaService) {}

  async getPipeline(pipelineId: string) {
    const pipeline = await this.prismaService.pipeline.findUnique({
      where: { id: pipelineId },
    })
    return pipeline
  }

  async getInterviewsByPipelineId(pipelineId: string) {
    const interviews = await this.prismaService.interview.findMany({
      where: { pipelineId },
    })
    return interviews
  }

  async createPipeline(pipelineBody: CreatePipelineDto, userId: string) {
    const { workspaceId, jobId, ...restBody } = pipelineBody

    const pipeline = await this.prismaService.pipeline.create({
      data: {
        ...restBody,
        Member: { connect: { uid: userId } },
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
    })

    return pipeline
  }

  async updatePipeline(pipelineId: string, pipelineBody: UpdatePipelineDto) {
    const pipeline = await this.prismaService.pipeline.update({
      where: { id: pipelineId },
      data: pipelineBody,
    })

    return pipeline
  }

  async deletePipeline(pipelineId: string) {
    const pipeline = await this.prismaService.pipeline.delete({
      where: { id: pipelineId },
    })
    return pipeline
  }
}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreatePipeline, Pipeline } from './pipeline.dto'

@Injectable()
export class PipelineService {
  constructor(private prismaService: PrismaService) {}

  async getAllPipelines(workspaceId: string) {
    const pipelines = await this.prismaService.pipeline.findMany({
      where: {
        workspaceId,
      },
    })

    return pipelines
  }

  async getPipeline(pipelineId: string) {
    const pipeline = await this.prismaService.pipeline.findUnique({
      where: {
        id: pipelineId,
      },
    })

    return pipeline
  }

  async getPipelineByJob(jobId: string) {
    const job = await this.prismaService.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        Pipeline: true,
      },
    })

    return job.Pipeline
  }

  async createPipeline(
    pipelineBody: Pipeline,
    userId: string,
    workspaceId: string,
    jobId: string,
  ) {
    const pipeline = await this.prismaService.pipeline.create({
      data: {
        ...pipelineBody,
        Member: { connect: { uid: userId } },
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
    })

    return pipeline
  }

  async updatePipeline(pipelineId: string, pipelineBody: CreatePipeline) {
    const pipeline = await this.prismaService.pipeline.update({
      where: { id: pipelineId },
      data: {
        ...pipelineBody,
      },
    })

    return pipeline
  }

  async deletePipeline(pipelineId: string): Promise<Pipeline> {
    const pipeline = await this.prismaService.pipeline.delete({
      where: { id: pipelineId },
    })
    return pipeline
  }
}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateInterview, Interview } from './interview.dto'

@Injectable()
export class InterviewService {
  constructor(private prismaService: PrismaService) {}

  async getAllInterviews(pipelineId: string) {
    const interviews = await this.prismaService.interview.findMany({
      where: {
        pipelineId,
      },
    })

    return interviews
  }

  async createInterview(
    interviewBody: Interview,
    userId: string,
    pipelineId: string,
  ) {
    const interview = await this.prismaService.interview.create({
      data: {
        ...interviewBody,
        Member: { connect: { uid: userId } },
        Pipeline: { connect: { id: pipelineId } },
      },
    })

    return interview
  }

  async updateInterview(interviewId: string, interviewBody: CreateInterview) {
    const interview = await this.prismaService.interview.update({
      where: { id: interviewId },
      data: {
        ...interviewBody,
      },
    })

    return interview
  }

  async deleteInterview(interviewId: string): Promise<Interview> {
    const interview = await this.prismaService.interview.delete({
      where: { id: interviewId },
    })
    return interview
  }
}

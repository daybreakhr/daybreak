import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateInterviewDto, UpdateInterviewDto } from './interview.dto'

@Injectable()
export class InterviewService {
  constructor(private prismaService: PrismaService) {}

  async getInterview(interviewId: string) {
    const interview = await this.prismaService.interview.findUnique({
      where: { id: interviewId },
    })
    return interview
  }

  async createInterview(interviewBody: CreateInterviewDto, userId: string) {
    const interview = await this.prismaService.interview.create({
      data: {
        ...interviewBody,
        Member: { connect: { uid: userId } },
      },
    })

    return interview
  }

  async updateInterview(
    interviewId: string,
    interviewBody: UpdateInterviewDto,
  ) {
    const interview = await this.prismaService.interview.update({
      where: { id: interviewId },
      data: interviewBody,
    })

    return interview
  }

  async deleteInterview(interviewId: string) {
    const interview = await this.prismaService.interview.delete({
      where: { id: interviewId },
    })
    return interview
  }
}

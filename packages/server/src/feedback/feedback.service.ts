import { isEmpty } from 'lodash'
import { BadRequestException, Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { CreateFeedbackDto, Feedback } from './feedback.dto'

@Injectable()
export class FeedbackService {
  constructor(private prismaService: PrismaService) {}

  async create(createdBy: string, feedbackBody: CreateFeedbackDto) {
    const { candidateId, interviewId, ...restValues } = feedbackBody
    if (!interviewId) {
      throw new BadRequestException('Interview ID is required')
    }
    const feedback = await this.prismaService.feedback.create({
      data: {
        ...restValues,
        Member: { connect: { uid: createdBy } },
        Candidate: { connect: { id: candidateId } },
        Interview: { connect: { id: interviewId } },
      },
    })

    return feedback
  }

  async update(feedbackId: string, feedbackBody: Partial<Feedback>) {
    if (!isEmpty(feedbackBody)) {
      const feedback = await this.prismaService.feedback.update({
        where: { id: feedbackId },
        data: feedbackBody,
      })
      return feedback
    } else {
      throw new BadRequestException('Request body is not available')
    }
  }

  async delete(feedbackId: string) {
    const feedback = await this.prismaService.feedback.delete({
      where: { id: feedbackId },
    })
    return feedback
  }
}

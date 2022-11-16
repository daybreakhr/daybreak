import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Feedback } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { isEmpty } from 'lodash'
import { CreateFeedbackDto } from './feedback.dto'

@Injectable()
export class FeedbackService {
  constructor(private prismaService: PrismaService) {}

  async getAll(candidateId: string) {
    const feedbacks = await this.prismaService.feedback.findMany({
      where: { candidateId },
      include: {
        Member: {
          select: {
            Workspace: true,
          },
        },
      },
    })
    return feedbacks
  }

  async getFeedback(feedbackId: string) {
    const feedback = await this.prismaService.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        Member: {
          select: {
            Workspace: true,
          },
        },
      },
    })
    return feedback
  }

  async create(
    candidateId: string,
    createdBy: string,
    feedbackBody: CreateFeedbackDto,
  ) {
    const feedback = await this.prismaService.feedback.create({
      data: {
        ...feedbackBody,
        Member: { connect: { uid: createdBy } },
        Candidate: { connect: { id: candidateId } },
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Request body is not available',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async delete(feedbackId: string) {
    const feedback = await this.prismaService.feedback.delete({
      where: { id: feedbackId },
    })
    return feedback
  }
}

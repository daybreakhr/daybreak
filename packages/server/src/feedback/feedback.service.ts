import { isEmpty } from 'lodash'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { CreateFeedbackDto, Feedback } from './feedback.dto'

@Injectable()
export class FeedbackService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async create(
    createdBy: string,
    feedbackBody: CreateFeedbackDto,
  ): Promise<Feedback> {
    const { candidateId, interviewId, ...restValues } = feedbackBody
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

  async update(
    feedbackId: string,
    feedbackBody: Partial<Feedback>,
  ): Promise<Feedback> {
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

  async delete(feedbackId: string): Promise<Feedback> {
    const feedback = await this.prismaService.feedback.delete({
      where: { id: feedbackId },
    })
    return feedback
  }
}

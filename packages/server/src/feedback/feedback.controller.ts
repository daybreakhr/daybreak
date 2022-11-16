import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Feedback } from '@prisma/client'
import { FeedbackService } from './feedback.service'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'

@Controller('candidates/:candidateId/feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('')
  async getAll(@Param('candidateId') candidateId: string) {
    const data = await this.feedbackService.getAll(candidateId)
    return data
  }

  @Get(':id')
  async getFeedback(@Param('id') id: string) {
    const data = await this.feedbackService.getFeedback(id)
    return data
  }

  @Post('')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async createFeedback(
    @Param('candidateId') candidateId: string,
    @GetUser() user: UserRecord,
    @Body() feedbackBody: Feedback,
  ) {
    const data = await this.feedbackService.create(
      candidateId,
      user.uid,
      feedbackBody,
    )
    return data
  }

  @Patch(':id')
  async patchFeedback(
    @Param('id') id: string,
    @Body() feedbackBody: Partial<Feedback>,
  ) {
    const data = await this.feedbackService.update(id, feedbackBody)
    return data
  }

  @Delete(':id')
  async deleteFeedback(@Param('id') id: string) {
    const data = await this.feedbackService.delete(id)
    return data
  }
}

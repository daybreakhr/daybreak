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
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiSecurity,
} from '@nestjs/swagger'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { FeedbackService } from './feedback.service'
import { CreateFeedbackDto, Feedback } from './feedback.dto'

@ApiSecurity('access-key')
@ApiTags('Feedback')
@Controller('candidates/:candidateId/feedbacks')
@UseGuards(AuthGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Feedbacks' })
  @ApiOkResponse({
    description: 'Feedbacks were returned successfully',
    type: [Feedback],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('candidateId') candidateId: string): Promise<Feedback[]> {
    const data = await this.feedbackService.getAll(candidateId)
    return data
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feedback' })
  @ApiOkResponse({
    description: 'feedback returned successfully',
    type: Feedback,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  async getFeedback(@Param('id') id: string): Promise<Feedback> {
    const data = await this.feedbackService.getFeedback(id)
    return data
  }

  @Post('')
  @ApiOperation({ summary: 'Create a feedback' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Feedback })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createFeedback(
    @Param('candidateId') candidateId: string,
    @GetUser() user: UserRecord,
    @Body() feedbackBody: CreateFeedbackDto,
  ): Promise<Feedback> {
    const data = await this.feedbackService.create(
      candidateId,
      user.uid,
      feedbackBody,
    )
    return data
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update feedback' })
  @ApiOkResponse({
    description: 'feedback updated successfully',
    type: Feedback,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  @ApiBody({ type: CreateFeedbackDto })
  async patchFeedback(
    @Param('id') id: string,
    @Body() feedbackBody: Partial<Feedback>,
  ): Promise<Feedback> {
    const data = await this.feedbackService.update(id, feedbackBody)
    return data
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback' })
  @ApiOkResponse({ description: 'feedback deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  async deleteFeedback(@Param('id') id: string): Promise<Feedback> {
    const data = await this.feedbackService.delete(id)
    return data
  }
}

import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { CreateInterview, Interview } from './interview.dto'
import { InterviewService } from './interview.service'

@ApiSecurity('access-key')
@ApiTags('Interview')
@Controller('/pipelines/:pipelineId/interviews')
@UseGuards(AuthGuard)
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Interviews for a pipeline' })
  @ApiOkResponse({
    description: 'Interviews were returned successfully',
    type: [Interview],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAllInterviews(
    @Param('pipelineId') pipelineId: string,
  ): Promise<Interview[]> {
    const data = await this.interviewService.getAllInterviews(pipelineId)
    return data
  }

  @Post('')
  @ApiOperation({ summary: 'Create an interview' })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Interview,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createInterview(
    @Param('pipelineId') pipelineId: string,
    @GetUser() user: UserRecord,
    @Body() interviewBody: Interview,
  ) {
    const data = await this.interviewService.createInterview(
      interviewBody,
      user.uid,
      pipelineId,
    )
    return data
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Interview' })
  @ApiOkResponse({
    description: 'interview updated successfully',
    type: Interview,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Interview not found' })
  @ApiBody({ type: CreateInterview })
  @UseGuards(AuthGuard)
  async updateInterview(
    @Param('id') id: string,
    @Body() updateInteriewBody: CreateInterview,
  ) {
    const data = await this.interviewService.updateInterview(
      id,
      updateInteriewBody,
    )
    return data
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete interview' })
  @ApiOkResponse({ description: 'interview deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'interview not found' })
  async deleteInterview(@Param('id') id: string): Promise<Interview> {
    const data = await this.interviewService.deleteInterview(id)
    return data
  }
}

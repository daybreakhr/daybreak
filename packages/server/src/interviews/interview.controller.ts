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
import {
  CreateInterviewDto,
  InterviewDto,
  UpdateInterviewDto,
} from './interview.dto'
import { InterviewService } from './interview.service'

@ApiSecurity('access-key')
@ApiTags('Interview')
@Controller('interviews')
@UseGuards(AuthGuard)
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get(':id')
  @ApiOperation({ operationId: 'GetInterviewById', summary: 'Get interview' })
  @ApiOkResponse({
    description: 'interview returned successfully',
    type: InterviewDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Interview not found' })
  async getInterview(@Param('id') id: string) {
    const data = await this.interviewService.getInterview(id)
    return data
  }

  @Post('')
  @ApiOperation({
    operationId: 'CreateInterview',
    summary: 'Create an interview',
  })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: InterviewDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createInterview(
    @GetUser() user: UserRecord,
    @Body() interviewBody: CreateInterviewDto,
  ) {
    const data = await this.interviewService.createInterview(
      interviewBody,
      user.uid,
    )
    return data
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'UpdateInterview', summary: 'Update Interview' })
  @ApiOkResponse({
    description: 'interview updated successfully',
    type: InterviewDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Interview not found' })
  @ApiBody({ type: UpdateInterviewDto })
  async updateInterview(
    @Param('id') id: string,
    @Body() updateInteriewBody: UpdateInterviewDto,
  ) {
    const data = await this.interviewService.updateInterview(
      id,
      updateInteriewBody,
    )
    return data
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'DeleteInterview', summary: 'Delete interview' })
  @ApiOkResponse({ description: 'interview deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'interview not found' })
  async deleteInterview(@Param('id') id: string) {
    const data = await this.interviewService.deleteInterview(id)
    return data
  }
}

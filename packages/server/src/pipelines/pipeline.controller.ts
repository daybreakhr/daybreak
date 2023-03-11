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
import { InterviewDto } from 'src/interviews/interview.dto'
import {
  CreatePipelineDto,
  PipelineDto,
  UpdatePipelineDto,
} from './pipeline.dto'
import { PipelineService } from './pipeline.service'

@ApiSecurity('access-key')
@ApiTags('Pipeline')
@Controller('pipelines')
@UseGuards(AuthGuard)
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Get(':id')
  @ApiOperation({ operationId: 'GetPipelineById', summary: 'Get pipeline' })
  @ApiOkResponse({
    description: 'pipeline returned successfully',
    type: PipelineDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Pipeline not found' })
  async getPipeline(@Param('id') id: string) {
    const data = await this.pipelineService.getPipeline(id)
    return data
  }

  @Get(':id/interviews')
  @ApiOperation({
    operationId: 'GetInterviewsByPipelineId',
    summary: 'Get interviews by pipeline id',
  })
  @ApiOkResponse({
    description: 'interviews returned successfully',
    type: [InterviewDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Pipeline not found' })
  async getInterviewsByPipelineId(@Param('id') id: string) {
    const data = await this.pipelineService.getInterviewsByPipelineId(id)
    return data
  }

  @Post('')
  @ApiOperation({
    operationId: 'CreatePipeline',
    summary: 'Create an Pipeline',
  })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: PipelineDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createPipeline(
    @GetUser() user: UserRecord,
    @Body() pipelineBody: CreatePipelineDto,
  ) {
    const data = await this.pipelineService.createPipeline(
      pipelineBody,
      user.uid,
    )
    return data
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'UpdatePipeline', summary: 'Update Pipeline' })
  @ApiOkResponse({
    description: 'pipeline updated successfully',
    type: PipelineDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Pipeline not found' })
  @ApiBody({ type: UpdatePipelineDto })
  async updatePipeline(
    @Param('id') id: string,
    @Body() updatePipelineBody: UpdatePipelineDto,
  ) {
    const data = await this.pipelineService.updatePipeline(
      id,
      updatePipelineBody,
    )
    return data
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pipeline' })
  @ApiOkResponse({ description: 'pipeline deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'pipeline not found' })
  async deletePipeline(@Param('id') id: string) {
    const data = await this.pipelineService.deletePipeline(id)
    return data
  }
}

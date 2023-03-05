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
import { CreatePipeline, Pipeline } from './pipeline.dto'
import { PipelineService } from './pipeline.service'

@ApiSecurity('access-key')
@ApiTags('Pipeline')
@Controller(':workspaceId/pipelines')
@UseGuards(AuthGuard)
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all pipelines in a workspace' })
  @ApiOkResponse({
    description: 'Pipelines were returned successfully',
    type: [Pipeline],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAllPipelines(
    @Param('workspaceId') workspaceId: string,
  ): Promise<Pipeline[]> {
    const data = await this.pipelineService.getAllPipelines(workspaceId)
    return data
  }

  @Post('')
  @ApiOperation({ summary: 'Create an Pipeline' })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Pipeline,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createPipeline(
    @Param('workspaceId') workspaceId: string,
    @GetUser() user: UserRecord,
    @Body() pipelineBody: Pipeline,
  ) {
    const data = await this.pipelineService.createPipeline(
      pipelineBody,
      user.uid,
      workspaceId,
    )
    return data
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Pipeline' })
  @ApiOkResponse({
    description: 'pipeline updated successfully',
    type: Pipeline,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Pipeline not found' })
  @ApiBody({ type: CreatePipeline })
  async updatePipeline(
    @Param('id') id: string,
    @Body() updatePipelineBody: CreatePipeline,
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
  async deletePipeline(@Param('id') id: string): Promise<Pipeline> {
    const data = await this.pipelineService.deletePipeline(id)
    return data
  }
}

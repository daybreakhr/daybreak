import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { Express } from 'express'
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
import { AuthGuard } from 'src/auth/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProspectService } from './prospect.service'
import {
  CreateProspectDto,
  Prospect,
  AddProspectToCandidate,
} from './prospect.dto'

@ApiSecurity('access-key')
@ApiTags('Prospect')
@Controller(':workspaceId/prospects')
@UseGuards(AuthGuard)
export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Prospects' })
  @ApiOkResponse({
    description: 'Prospects were returned successfully',
    type: [Prospect],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.prospectService.getAll(workspaceId)
    return data
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prospect' })
  @ApiOkResponse({
    description: 'prospect returned successfully',
    type: Prospect,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Prospect not found' })
  async getProspect(@Param('id') id: string) {
    const data = await this.prospectService.getProspect(id)
    return data
  }

  @Post('')
  @ApiOperation({ summary: 'Create a prospect' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Prospect })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseInterceptors(FileInterceptor('file'))
  async createProspect(
    @Param('workspaceId') workspaceId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() prospectBody: CreateProspectDto,
  ) {
    const data = await this.prospectService.create(
      workspaceId,
      file,
      prospectBody,
    )
    return data
  }

  @Patch(':id/candidates')
  @ApiOperation({ summary: 'Add prospect as candidate' })
  @ApiOkResponse({
    description: 'candidate added successfully',
    type: Prospect,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Prospect not found' })
  @ApiBody({ type: AddProspectToCandidate })
  async AddProspectToCandidate(
    @Param('id') id: string,
    @Body() { jobId }: AddProspectToCandidate,
  ) {
    const data = await this.prospectService.addToCandidate(id, jobId)
    return data
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update prospect' })
  @ApiOkResponse({
    description: 'prospect updated successfully',
    type: Prospect,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Prospect not found' })
  @ApiBody({ type: CreateProspectDto })
  async patchProspect(
    @Param('id') id: string,
    @Body() prospectBody: Partial<Prospect>,
  ) {
    const data = await this.prospectService.update(id, prospectBody)
    return data
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete prospect' })
  @ApiOkResponse({ description: 'prospect deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Prospect not found' })
  async deleteProspect(@Param('id') id: string) {
    const data = await this.prospectService.delete(id)
    return data
  }
}

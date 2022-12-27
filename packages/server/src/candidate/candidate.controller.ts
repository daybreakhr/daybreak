import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Express } from 'express'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { CandidateDto, CreateCandidateDto } from './candidate.dto'
import { CandidateService } from './candidate.service'

@ApiSecurity('access-key')
@ApiTags('Candidate')
@Controller(':workspaceId/candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all Candidates' })
  @ApiOkResponse({
    description: 'Candidates were returned successfully',
    type: [CandidateDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.candidateService.getAll(workspaceId)
    return data
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Candidate' })
  @ApiOkResponse({
    description: 'Candidates were returned successfully',
    type: CandidateDto,
  })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  async getById(@Param('id') id: string) {
    const data = await this.candidateService.getById(id)
    return data
  }

  @Post('')
  @ApiOperation({ summary: 'Create a Candidate' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CandidateDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('workspaceId') workspaceId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createCandidateDto: CreateCandidateDto,
  ): Promise<CandidateDto> {
    const data = await this.candidateService.create(
      workspaceId,
      file,
      createCandidateDto,
    )
    return data
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Candidate' })
  @ApiOkResponse({
    description: 'candidate updated successfully',
    type: CandidateDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  @ApiBody({ type: CreateCandidateDto })
  @UseGuards(AuthGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateCandidateDto: Partial<CreateCandidateDto>,
  ) {
    const data = await this.candidateService.update(id, updateCandidateDto)
    return data
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') candidateId: string) {
    const data = await this.candidateService.delete(candidateId)
    return data
  }
}

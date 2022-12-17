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
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import { Candidate } from '@prisma/client'
import { Roles } from 'src/auth/roles.decorator'
import { CreateCandidateDto } from './candidate.dto'
import { CandidateService } from './candidate.service'

@Controller(':workspaceId/candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.candidateService.getAll(workspaceId)
    return data
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(@Param('id') id: string) {
    const data = await this.candidateService.getById(id)
    return data
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('workspaceId') workspaceId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createCandidateDto: CreateCandidateDto,
  ) {
    const data = await this.candidateService.create(
      workspaceId,
      file,
      createCandidateDto,
    )
    return data
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateCandidateDto: Partial<Candidate>,
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

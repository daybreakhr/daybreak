import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
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
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() createCandidateDto: CreateCandidateDto,
  ) {
    const data = await this.candidateService.create(
      workspaceId,
      createCandidateDto,
    )
    return data
  }
}

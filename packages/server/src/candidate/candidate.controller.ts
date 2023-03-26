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
import { CalendarDto } from 'src/calendar/calendar.dto'
import { EmailDto } from 'src/email/email.dto'
import {
  CandidateDto,
  CreateCandidateDto,
  UpdateCandidateDto,
} from './candidate.dto'
import { CandidateService } from './candidate.service'

@ApiSecurity('access-key')
@ApiTags('Candidate')
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'GetCandidateById',
    summary: 'Get a candidate by id',
  })
  @ApiOkResponse({
    description: 'Candidates were returned successfully',
    type: CandidateDto,
  })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getById(@Param('id') id: string) {
    const data = await this.candidateService.getById(id)
    return data
  }

  @Get(':id/calendars')
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'GetCalendarEventsForCandidate',
    summary: 'Get all calendar events for a candidate',
  })
  @ApiOkResponse({
    description: 'calendar events were returned successfully',
    type: [CalendarDto],
  })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getCalendarEventsForCandidate(@Param('id') id: string) {
    const data = await this.candidateService.getCalendarEventsForCandidate(id)
    return data
  }

  @Get(':id/emails')
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'GetEmailsForCandidate',
    summary: 'Get all emails for a candidate',
  })
  @ApiOkResponse({
    description: 'Emails were returned successfully',
    type: [EmailDto],
  })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getEmailsForCandidate(@Param('id') id: string) {
    const data = await this.candidateService.getEmailsForCandidate(id)
    return data
  }

  @Post('')
  @ApiOperation({
    operationId: 'CreateCandidate',
    summary: 'Create new candidate',
  })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CandidateDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCandidateDto: CreateCandidateDto,
  ) {
    const data = await this.candidateService.create(file, createCandidateDto)
    return data
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'UpdateCandidate',
    summary: 'Update a candidate',
  })
  @ApiOkResponse({
    description: 'candidate updated successfully',
    type: CandidateDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  @ApiBody({ type: UpdateCandidateDto })
  @UseGuards(AuthGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    const data = await this.candidateService.update(id, updateCandidateDto)
    return data
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({
    operationId: 'DeleteCandidate',
    summary: 'Delete a candidate',
  })
  @ApiOkResponse({
    description: 'candidate deleted successfully',
    type: CandidateDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async delete(@Param('id') candidateId: string) {
    const data = await this.candidateService.delete(candidateId)
    return data
  }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Request } from 'express'
import { RefreshTokenInterceptor } from 'src/auth/refresh-token.interceptor'
import { CalendarDto, CreateCalendarDto } from './calendar.dto'
import { CalendarService } from './calendar.service'

@ApiSecurity('access-key')
@ApiTags('Calendar')
@Controller('candidates/:candidateId/calendars')
@UseGuards(AuthGuard)
@UseInterceptors(RefreshTokenInterceptor)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Calendar Events for a candidate' })
  @ApiOkResponse({
    description: 'Calendar events were returned successfully',
    type: [CalendarDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('candidateId') candidateId: string) {
    const data = await this.calendarService.getAll(candidateId)
    return data
  }

  @Post('')
  @ApiOperation({ summary: 'Create a calendar event' })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: CalendarDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createCalendarEvent(
    @Req() req: Request,
    @Param('candidateId') candidateId: string,
    @GetUser() user: UserRecord,
    @Body() calendarBody: CreateCalendarDto,
  ) {
    const accessToken: string = req.cookies?.access_token

    if (accessToken) {
      const data = await this.calendarService.createCalendarEvent(
        accessToken,
        candidateId,
        user.uid,
        calendarBody,
      )
      return data
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unable to get access_token for google authorization',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }
}

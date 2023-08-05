import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
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
@Controller('calendars')
@UseGuards(AuthGuard)
@UseInterceptors(RefreshTokenInterceptor)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

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
    @GetUser() user: UserRecord,
    @Body() calendarBody: CreateCalendarDto,
  ) {
    const accessToken: string = req.cookies?.access_token

    if (accessToken) {
      const data = await this.calendarService.createCalendarEvent(
        accessToken,
        user.uid,
        calendarBody,
      )
      return data
    } else {
      throw new UnauthorizedException(
        'Unable to get access_token for google authorization',
      )
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete calendar event' })
  @ApiOkResponse({
    description: 'calendar event deleted successfully',
    type: CalendarDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Calendar event not found' })
  async deleteCalendarEvent(@Param('id') id: string, @Req() req: Request) {
    const accessToken: string = req.cookies?.access_token

    if (accessToken) {
      const data = await this.calendarService.deleteCalendarEvent(
        id,
        accessToken,
      )
      return data
    } else {
      throw new UnauthorizedException(
        'Unable to get access_token for google authorization',
      )
    }
  }
}

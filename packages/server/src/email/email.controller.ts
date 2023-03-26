import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
import { EmailDto, CreateEmailDto } from './email.dto'
import { EmailService } from './email.service'

@ApiSecurity('access-key')
@ApiTags('Email')
@Controller('emails')
@UseGuards(AuthGuard)
@UseInterceptors(RefreshTokenInterceptor)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('')
  @ApiOperation({ summary: 'Create an email event' })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: EmailDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createEmail(
    @Req() req: Request,
    @GetUser() user: UserRecord,
    @Body() emailBody: CreateEmailDto,
  ) {
    const accessToken: string = req.cookies?.access_token

    if (accessToken) {
      const data = await this.emailService.createEmailEvent(
        accessToken,
        user,
        emailBody,
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

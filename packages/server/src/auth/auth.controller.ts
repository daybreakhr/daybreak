import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import { UserRecord } from 'firebase-admin/auth'
import { MemberDto } from 'src/members/members.dto'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { GetUser } from './get-user.decorator'

@ApiSecurity('access-key')
@ApiTags('Auth')
@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('me')
  @ApiOperation({ summary: 'Get Member details' })
  @ApiOkResponse({
    description: 'Member details fetched successfully',
    type: MemberDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getMe(@GetUser() user: UserRecord) {
    const data = await this.authService.getMe(user.uid)
    return data
  }

  @Post('google')
  @ApiOperation({ summary: 'Get access and refresh token using code' })
  @ApiCreatedResponse({
    description: 'Received tokens successfully',
  })
  async getGoogleCredentials(
    @GetUser() user: UserRecord,
    @Body() code: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.getGoogleCredentials(code, user.uid)
    response.cookie('access_token', data.access_token, {
      expires: new Date(data.expiry_date - 5000),
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
    })
    return data
  }
}

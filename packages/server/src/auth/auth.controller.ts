import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
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
  constructor(private authService: AuthService) {}

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
  async getGoogleCredentials(@Body() code: string) {
    const data = await this.authService.getGoogleCredentials(code)
    return data
  }

  @Post('google/refresh-token')
  @ApiOperation({ summary: 'Get access token using refresh token' })
  @ApiCreatedResponse({
    description: 'Received tokens successfully',
  })
  async getRefreshAccessToken(@Body() refreshToken: string) {
    const data = await this.authService.getRefreshAccessToken(refreshToken)
    return data
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common'
import {
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
@Controller('')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get Member details' })
  @ApiOkResponse({
    description: 'Departments were returned successfully',
    type: MemberDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getMe(@GetUser() user: UserRecord) {
    const data = await this.authService.getMe(user.uid)
    return data
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { GetUser } from './get-user.decorator'

@Controller('')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async getMe(@GetUser() user: UserRecord) {
    const data = await this.authService.getMe(user.uid)
    return data
  }
}

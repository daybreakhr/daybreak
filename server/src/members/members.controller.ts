import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { MembersService } from './members.service'

@Controller(':workspaceId/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAllMembers(@Param('workspaceId') workspaceId: string) {
    const data = await this.membersService.getAllMembers(workspaceId)
    return data
  }
}

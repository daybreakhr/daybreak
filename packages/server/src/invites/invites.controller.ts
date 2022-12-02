import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { InvitesService } from './invites.service'

@Controller(':workspaceId/invite')
@UseGuards(AuthGuard)
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get('')
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.invitesService.getAllInvites(workspaceId)
    return data
  }

  @Get(':id')
  async getInvite(@Param('id') id: string) {
    const data = await this.invitesService.getInvite(id)
    return data
  }

  @Post('/new')
  async createInvite(
    @Param('workspaceId') workspaceId: string,
    @GetUser() user: UserRecord,
    @Body() { email, role },
  ) {
    const data = await this.invitesService.createInvite(
      email,
      workspaceId,
      user.uid,
      user.displayName,
      role,
    )
    return data
  }

  @Post('/validate')
  async validateInvitees(@GetUser() user: UserRecord, @Body() { inviteId }) {
    const data = await this.invitesService.validateInvitees(inviteId, user.uid)
    return data
  }
}

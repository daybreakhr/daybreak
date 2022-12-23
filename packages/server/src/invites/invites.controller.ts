import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { InvitesService } from './invites.service'
import { Invite } from './invites.dto'
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger'

@ApiSecurity('access-key')
@ApiTags('Invite')
@Controller(':workspaceId/invite')
@UseGuards(AuthGuard)
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Invitees for workspace' })
  @ApiOkResponse({
    description: 'Invites were returned successfully',
    type: [Invite],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('workspaceId') workspaceId: string): Promise<Invite[]> {
    const data = await this.invitesService.getAllInvites(workspaceId)
    return data
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Invite' })
  @ApiOkResponse({
    description: 'invite returned successfully',
    type: Invite,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Invite not found' })
  async getInvite(@Param('id') id: string): Promise<Invite> {
    const data = await this.invitesService.getInvite(id)
    return data
  }

  @Post('/new')
  @ApiOperation({ summary: 'Create an invite' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Invite })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createInvite(
    @Param('workspaceId') workspaceId: string,
    @GetUser() user: UserRecord,
    @Body() { email, role }: Invite,
  ): Promise<Invite> {
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
  @ApiOperation({ summary: 'Validate an invite' })
  @ApiOkResponse({
    description: 'invite validated successfully',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async validateInvitees(@GetUser() user: UserRecord, @Body() { inviteId }) {
    const data = await this.invitesService.validateInvitees(inviteId, user.uid)
    return data
  }
}

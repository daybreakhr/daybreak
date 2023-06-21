import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { NotificationService } from 'src/notification/notification.service'
import { isNil } from 'lodash'

@Injectable()
export class InvitesService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  async getAllInvites(workspaceId: string) {
    const invites = await this.prismaService.invitees.findMany({
      where: {
        workspaceId,
      },
    })
    return invites
  }

  async getInvite(inviteId: string) {
    const invites = await this.prismaService.invitees.findUnique({
      where: {
        id: inviteId,
      },
    })
    return invites
  }

  async getInviteById(inviteId: string) {
    try {
      const invitee = await this.prismaService.invitees.findUnique({
        where: {
          id: inviteId,
        },
      })

      return invitee
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invitee not found. Invalid invite id.',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async createInvite(
    email: string,
    workspaceId: string,
    memberId: string,
    userName: string,
    role: Role,
  ) {
    const userRecord = await this.authService.getUserByEmail(email)
    if (userRecord) {
      const isAMember = await this.prismaService.member.findFirst({
        where: {
          uid: userRecord.uid,
          workspaceId,
        },
      })

      if (isAMember) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Member already exists',
          },
          HttpStatus.BAD_REQUEST,
        )
      }
    }

    const isAlreadyInvited = await this.prismaService.invitees.findFirst({
      where: {
        email,
        workspaceId,
      },
      include: { Workspace: true, Member: true },
    })

    if (isAlreadyInvited) {
      await this.notificationService.sendInviteMail(email, userName, {
        workspaceName: isAlreadyInvited.Workspace.name,
        id: isAlreadyInvited.id,
      })

      return isAlreadyInvited
    }

    const invite = await this.prismaService.invitees.create({
      data: {
        email,
        role,
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid: memberId } },
      },
      include: { Workspace: true, Member: true },
    })

    await this.notificationService.sendInviteMail(email, userName, {
      workspaceName: invite.Workspace.name,
      id: invite.id,
    })

    return invite
  }

  async validateInvitees(inviteId: string, uid: string) {
    const invitee = await this.getInviteById(inviteId)

    if (isNil(invitee)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Invite ID',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const member = await this.prismaService.member.create({
      data: {
        uid,
        role: invitee.role,
        Workspace: { connect: { id: invitee.workspaceId } },
      },
      include: { Workspace: true },
    })

    await this.deleteInvitee(invitee.id)

    return member
  }

  async deleteInvitee(inviteId: string) {
    const invitee = await this.prismaService.invitees.delete({
      where: {
        id: inviteId,
      },
    })

    return invitee
  }
}

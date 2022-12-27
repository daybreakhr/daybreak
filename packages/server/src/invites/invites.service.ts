import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { AWSSESService } from 'src/aws/aws.ses.service'
import { AuthService } from 'src/auth/auth.service'
import { ConfigService } from '@nestjs/config'
import { isNil } from 'lodash'

@Injectable()
export class InvitesService {
  constructor(
    private prismaService: PrismaService,
    private sesService: AWSSESService,
    private authService: AuthService,
    private configService: ConfigService,
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
      await this.sendInviteMail(email, userName, {
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

    await this.sendInviteMail(email, userName, {
      workspaceName: invite.Workspace.name,
      id: invite.id,
    })

    return invite
  }

  async sendInviteMail(
    email: string,
    userName: string,
    inviteConfig: { workspaceName: string; id: string },
  ): Promise<void> {
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL')

    await this.sesService.sendMail({
      to: email,
      subject: `${userName} invited you to join ${inviteConfig.workspaceName} on Daybreak HR`,
      body: `<p>Hi,</p>
      <p>${userName} has invited you to join ${inviteConfig.workspaceName} on Daybreak HR.</p>
      <p>Accept this invitation by clicking on this link: ${FRONTEND_URL}/invite/${inviteConfig.id}</p>`,
    })
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

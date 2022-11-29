import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { AWSSESService } from 'src/aws/aws.ses.service'
import { AuthService } from 'src/auth/auth.service'
import { ConfigService } from '@nestjs/config'

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

  async createInvite(
    email: string,
    workspaceId: string,
    memberId: string,
    userName: string,
    role: Role,
  ) {
    const userRecord = await this.authService.getUserByEmail(email)
    if (userRecord) {
      const isAMember = await this.prismaService.member.findUnique({
        where: {
          uid: userRecord.uid,
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

    const invite = await this.prismaService.invitees.create({
      data: {
        email,
        role,
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid: memberId } },
      },
      include: { Workspace: true, Member: true },
    })

    email = 'no-reply@daybreakhire.com' // Remove once sandbox mode is done

    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL')

    const data = await this.sesService.sendMail({
      to: email,
      subject: `${userName} invited you to join ${invite.Workspace.name} on Daybreak HR`,
      body: `${userName} has invited you to join ${invite.Workspace.name} on Daybreak HR.
Accept this invitation by clicking on this link:
${FRONTEND_URL}/invite/${invite.id}`,
    })

    return data
  }
}

import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthService } from 'src/auth/auth.service'
import { InvitesService } from 'src/invites/invites.service'
import { PrismaService } from 'src/prisma.service'
import { FirebaseService } from 'src/firebase/firebase.service'
import { AWSSESService } from 'src/aws/aws.ses.service'

@Injectable()
export class MembersService {
  constructor(
    private firebaseService: FirebaseService,
    private prismaService: PrismaService,
    private authService: AuthService,
    private invitesService: InvitesService,
    private sesService: AWSSESService,
  ) {}

  async getAllMembers(workspaceId: string) {
    const members = await this.prismaService.member.findMany({
      where: { workspaceId },
    })

    const identifiers = members.map(({ uid }) => ({ uid }))
    const users = await this.authService.getUsers(identifiers)
    return users.map((user) => {
      return { ...user, role: user.customClaims.role }
    })
  }

  async inviteMember({ email, workspaceId, memberId, userName }: { email: string, workspaceId: string, memberId: string, userName: string }) {
    email = 'no-reply@daybreakhire.com' // Remove once sandbox mode is done

    // update the Invite db

    const inviteData = await this.invitesService.createInvite(email, workspaceId, memberId)

    const FRONTEND_URL = 'https://daybreakhr.com'

    const data = await this.sesService.sendMail({
      to: email,
      subject: `${userName} invited you to join ${inviteData.Workspace.name} on Daybreak HR`,
      body: `${userName} has invited you to join ${inviteData.Workspace.name} on Daybreak HR.
Accept this invitation by clicking on this link:
${FRONTEND_URL}/invite/${inviteData.id}`,
    })

    return data
  }

  async updateRole(
    memberId: string,
    updateRoleDto: { role: Role },
  ): Promise<UserRecord> {
    await this.firebaseService.auth.setCustomUserClaims(memberId, {
      role: updateRoleDto.role,
    })
    const updatedMember = await this.authService.getUser(memberId)
    return updatedMember
  }
}

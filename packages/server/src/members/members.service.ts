import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'
import { FirebaseService } from 'src/firebase/firebase.service'
import { AWSSESService } from 'src/aws/aws.ses.service'

@Injectable()
export class MembersService {
  constructor(
    private firebaseService: FirebaseService,
    private prismaService: PrismaService,
    private authService: AuthService,
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

  async inviteMember() {
    const data = await this.sesService.sendMail({
      to: 'him.nagrath@gmail.com',
      subject: 'USER invited you to join WORKSPACE on Daybreak HR',
      body: `USER has invited you to join WORKSPACE on Daybreak HR 
      Accept the invitation by clicking on this link: some_url_from_daybreak`,
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

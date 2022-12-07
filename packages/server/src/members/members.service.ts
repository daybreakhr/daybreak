import { Injectable } from '@nestjs/common'
import { Member, Role } from '@prisma/client'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MembersService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async getAllMembers(workspaceId: string) {
    const members = await this.prismaService.member.findMany({
      where: { workspaceId },
    })
    const memberByUid = members.reduce(
      (acc, curr) => ({ ...acc, [curr.uid]: curr }),
      {} as Record<string, Member>,
    )

    const identifiers = members.map(({ uid }) => ({ uid }))
    const users = await this.authService.getUsers(identifiers)
    return users.map((user) => {
      return { ...user, role: memberByUid[user.uid].role }
    })
  }

  async updateMember(memberId: string, updateMemberDto: { role: Role }) {
    const member = await this.prismaService.member.update({
      where: { id: memberId },
      data: updateMemberDto,
    })

    const user = await this.authService.getUser(member.uid)
    return { ...user, role: member.role }
  }
}

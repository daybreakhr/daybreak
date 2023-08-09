import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'
import { MemberDto, UpdateMemberDto } from './members.dto'

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
      {} as Record<string, MemberDto>,
    )

    const identifiers = members.map(({ uid }) => ({ uid }))
    const users = await this.authService.getUsers(identifiers)

    return users.map((user) => {
      return { ...user, ...memberByUid[user.uid] }
    })
  }

  async getMemberByUid(uid: string) {
    const member = await this.prismaService.member.findUnique({
      where: { uid },
    })

    const user = await this.authService.getUser(uid)
    return { ...user, ...member }
  }

  async getMembersByUids(uids: string[]) {
    const members = await this.prismaService.member.findMany({
      where: { uid: { in: uids } },
    })

    const memberByUid = members.reduce(
      (acc, curr) => ({ ...acc, [curr.uid]: curr }),
      {} as Record<string, MemberDto>,
    )

    const identifiers = members.map(({ uid }) => ({ uid }))
    const users = await this.authService.getUsers(identifiers)

    return users.map((user) => {
      return { ...user, ...memberByUid[user.uid] }
    })
  }

  async updateMember(memberId: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.prismaService.member.update({
      where: { id: memberId },
      data: updateMemberDto,
    })

    const user = await this.authService.getUser(member.uid)
    return { ...user, ...member }
  }

  async addApp(
    memberId: string,
    appName: 'gmail' | 'gcal',
    isInstalled: boolean,
  ) {
    const { Integration } = await this.prismaService.member.findUnique({
      where: { id: memberId },
    })

    let newIntegration = { [appName]: { isInstalled } }
    if (Integration) {
      newIntegration = { ...Integration, [appName]: { isInstalled } }
    }

    const member = await this.prismaService.member.update({
      where: { id: memberId },
      data: { Integration: newIntegration },
      include: { Workspace: true },
    })

    return member
  }
}

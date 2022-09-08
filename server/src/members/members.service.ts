import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import type { UserRecord } from 'firebase-admin/auth'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MembersService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async getAllMembers(workspaceId: string): Promise<Array<UserRecord & Role>> {
    const members = await this.prismaService.member.findMany({
      where: { workspaceId },
    })

    const identifiers = members.map(({ uid }) => ({ uid }))
    const users = await this.authService.getUsers(identifiers)
    const usersById = users.reduce(
      (acc, curr) => ({ ...acc, [curr.uid]: { ...curr } }),
      {},
    )
    return members.map(({ uid, role }) => ({ ...usersById[uid], role }))
  }
}

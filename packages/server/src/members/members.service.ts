import { Injectable } from '@nestjs/common'
import { AppName } from '@prisma/client'
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
      return {
        ...user,
        role: memberByUid[user.uid].role,
        memberId: memberByUid[user.uid].id,
        isSuspended: memberByUid[user.uid].isSuspended,
      }
    })
  }

  async updateMember(memberId: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.prismaService.member.update({
      where: { id: memberId },
      data: updateMemberDto,
    })

    const user = await this.authService.getUser(member.uid)
    return {
      ...user,
      role: member.role,
      memberId: member.id,
      isSuspended: member.isSuspended,
    }
  }

  async addApp(memberId: string, app: AppName, isInstalled: boolean) {
    const { App } = await this.prismaService.member.findFirst({
      where: {
        id: memberId,
      },
    })

    let member

    if (!App.length) {
      member = await this.prismaService.member.update({
        where: { id: memberId },
        data: {
          App: {
            push: {
              appName: app,
              isInstalled,
            },
          },
        },
      })
    } else {
      member = await this.prismaService.member.update({
        where: { id: memberId },
        data: {
          App: {
            set: App.map(({ appName, ...rest }) => {
              if (app === appName) {
                return {
                  appName,
                  isInstalled,
                }
              } else {
                return {
                  appName,
                  ...rest,
                }
              }
            }),
          },
        },
      })
    }

    return member
  }
}

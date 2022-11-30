import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Member } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { FirebaseService } from 'src/firebase/firebase.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private prismaService: PrismaService,
  ) {}

  async verifyIdToken(idToken: string): Promise<UserRecord> {
    try {
      const { uid } = await this.firebaseService.auth.verifyIdToken(idToken)
      const user = await this.firebaseService.auth.getUser(uid)
      return user
    } catch (error) {
      throw new UnauthorizedException('Invalid firebaseId token')
    }
  }

  async getUsers(
    identifiers: Array<{ uid: string }>,
  ): Promise<UserRecord[] | undefined> {
    try {
      const getUserResults = await this.firebaseService.auth.getUsers(
        identifiers,
      )
      return getUserResults.users
    } catch (error) {
      return undefined
    }
  }

  async getUser(uid: string): Promise<UserRecord | undefined> {
    try {
      const user = await this.firebaseService.auth.getUser(uid)
      return user
    } catch (error) {
      return undefined
    }
  }

  async getUserByEmail(email: string): Promise<UserRecord | undefined> {
    try {
      const user = await this.firebaseService.auth.getUserByEmail(email)
      return user
    } catch (error) {
      return undefined
      }
    }
    
  async getMe(uid: string): Promise<Member | null> {
    try {
      const member = await this.prismaService.member.findUnique({
        where: { uid },
      })
      return member
    } catch (error) {
      return null
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Member } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import { FirebaseService } from 'src/firebase/firebase.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
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

  async getGoogleCredentials(code: string) {
    const oAuth2Client = new OAuth2Client(
      this.configService.get<string>('FIREBASE_CLIENT_ID'),
      this.configService.get<string>('FIREBASE_CLIENT_SECRET'),
      'postmessage',
    )

    const { tokens } = await oAuth2Client.getToken(code)
    return tokens
  }

  async getRefreshAccessToken(refreshToken: string) {
    const user = new UserRefreshClient(
      this.configService.get<string>('FIREBASE_CLIENT_ID'),
      this.configService.get<string>('FIREBASE_CLIENT_SECRET'),
      refreshToken,
    )

    const { credentials } = await user.refreshAccessToken()
    return credentials
  }
}

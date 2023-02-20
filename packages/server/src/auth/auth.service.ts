import { encrypt, decrypt } from 'src/utils/encrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Member } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import { FirebaseService } from 'src/firebase/firebase.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {
  private readonly googleEncryptToken: string
  private readonly googleEncryptTokenByteSize: number

  constructor(
    private readonly configService: ConfigService,
    private readonly firebaseService: FirebaseService,
    private prismaService: PrismaService,
  ) {
    this.googleEncryptToken = configService.get<string>('GOOGLE_ENCRYPT_TOKEN')

    this.googleEncryptTokenByteSize = configService.get<number>(
      'GOOGLE_ENCRYPT_TOKEN_BYTE_SIZE',
    )
  }

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

  async getGoogleCredentials(code: string, uid: string) {
    const oAuth2Client = new OAuth2Client(
      this.configService.get<string>('FIREBASE_CLIENT_ID'),
      this.configService.get<string>('FIREBASE_CLIENT_SECRET'),
      'postmessage',
    )

    const { tokens } = await oAuth2Client.getToken(code)

    const encryptedToken = await encrypt(
      tokens.refresh_token,
      this.googleEncryptToken,
      this.googleEncryptTokenByteSize,
    )

    await this.prismaService.member.update({
      where: { uid },
      data: { googleRefreshToken: encryptedToken },
    })
    return tokens
  }

  async getRefreshAccessToken(uid: string) {
    const { googleRefreshToken } = await this.prismaService.member.findUnique({
      where: { uid },
    })

    if (googleRefreshToken) {
      const decryptedToken = await decrypt(
        googleRefreshToken,
        this.googleEncryptToken,
        this.googleEncryptTokenByteSize,
      )

      const user = new UserRefreshClient(
        this.configService.get<string>('FIREBASE_CLIENT_ID'),
        this.configService.get<string>('FIREBASE_CLIENT_SECRET'),
        decryptedToken,
      )

      const { credentials } = await user.refreshAccessToken()
      return credentials
    } else {
      return null
    }
  }
}

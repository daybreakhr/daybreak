import { stringify } from 'qs'
import { HttpService } from '@nestjs/axios'
import type { Member } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { UserRecord } from 'firebase-admin/auth'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { encrypt, decrypt } from 'src/utils/encrypt'
import { FirebaseService } from 'src/firebase/firebase.service'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class AuthService {
  private logger = new Logger('AUTH')

  constructor(
    private readonly configService: ConfigService,
    private readonly firebaseService: FirebaseService,
    private prismaService: PrismaService,
    private readonly httpService: HttpService,
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

  async getGoogleCredentials(code: string, uid: string) {
    const oAuth2Client = new OAuth2Client(
      this.configService.get<string>('FIREBASE_CLIENT_ID'),
      this.configService.get<string>('FIREBASE_CLIENT_SECRET'),
      'postmessage',
    )

    const { tokens } = await oAuth2Client.getToken(code)

    const encryptedToken = await encrypt(tokens.refresh_token)

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

    try {
      if (googleRefreshToken) {
        const decryptedToken = await decrypt(googleRefreshToken)

        const user = new UserRefreshClient(
          this.configService.get<string>('FIREBASE_CLIENT_ID'),
          this.configService.get<string>('FIREBASE_CLIENT_SECRET'),
          decryptedToken,
        )

        const { credentials } = await user.refreshAccessToken()
        return credentials
      }
    } catch (error) {
      // If the refresh token has expired, delete it from the database
      if (error.code === 401) {
        this.logger.error(error)
        await this.prismaService.member.update({
          where: { uid },
          data: { googleRefreshToken: null },
        })
        throw new UnauthorizedException('Invalid google refresh token')
      }
    }
  }

  async getSlackCredentials(code: string, uid: string) {
    const slackOauthUrl = 'https://slack.com/api/oauth.v2.access'
    const payload = {
      code,
      client_id: this.configService.get<string>('SLACK_APP_CLIENT_ID'),
      client_secret: this.configService.get<string>('SLACK_APP_CLIENT_SECRET'),
    }

    const { data } = await firstValueFrom(
      this.httpService.post(slackOauthUrl, stringify(payload)).pipe(
        catchError((error) => {
          this.logger.error(error.response.data)
          throw error
        }),
      ),
    )

    this.logger.log(data, 'Slack credentials')

    if (data.ok) {
      const encryptedToken = await encrypt(data.access_token)

      const { Integration } = await this.prismaService.member.update({
        where: { uid },
        data: { slackBotToken: encryptedToken },
      })

      let slackIntegrationData = {
        slack: {
          isInstalled: true,
          meta: { userId: data.authed_user.id, botUserId: data.bot_user_id },
        },
      }
      if (Integration) {
        slackIntegrationData = { ...Integration, ...slackIntegrationData }
      }

      const member = await this.prismaService.member.update({
        where: { uid },
        data: { Integration: slackIntegrationData },
      })

      return member
    }
  }
}

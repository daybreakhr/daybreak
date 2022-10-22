import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRecord } from 'firebase-admin/auth'
import { FirebaseService } from 'src/firebase/firebase.service'

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

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
}

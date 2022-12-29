import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import type { Resume } from '@affinda/affinda'
import { catchError, firstValueFrom } from 'rxjs'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AffindaService {
  private logger = new Logger('HTTP')

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async getParsedResume(affindaId: string) {
    const AFFINDA_TOKEN = this.configService.get<string>('AFFINDA_TOKEN')
    const AFFINDA_URL = this.configService.get<string>('AFFINDA_URL')

    const url = `${AFFINDA_URL}/resumes/${affindaId}`

    const { data } = await firstValueFrom(
      this.httpService
        .get<Resume>(url, {
          headers: { Authorization: `Bearer ${AFFINDA_TOKEN}` },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data)
            throw error
          }),
        ),
    )

    return data.data
  }
}

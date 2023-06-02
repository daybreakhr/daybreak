import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import type {
  JobDescription,
  Resume,
  ResumeSearchMatch,
} from '@affinda/affinda'
import { catchError, firstValueFrom } from 'rxjs'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AffindaService {
  private logger = new Logger('AFFINDA')

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  private affindaToken = this.configService.get<string>('AFFINDA_TOKEN')
  private affindaUrl = this.configService.get<string>('AFFINDA_URL')

  async getParsedResume(affindaId: string) {
    const url = `${this.affindaUrl}/resumes/${affindaId}`

    const { data } = await firstValueFrom(
      this.httpService
        .get<Resume>(url, {
          headers: { Authorization: `Bearer ${this.affindaToken}` },
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

  async uploadResume(resumeUrl: string) {
    const url = `${this.affindaUrl}/resumes`

    const { data } = await firstValueFrom(
      this.httpService
        .post<Resume>(
          url,
          { url: resumeUrl },
          { headers: { Authorization: `Bearer ${this.affindaToken}` } },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data)
            throw error
          }),
        ),
    )

    return data
  }

  async uploadJobDescription(jdPdfUrl: string) {
    const url = `${this.affindaUrl}/job_descriptions`

    const { data } = await firstValueFrom(
      this.httpService
        .post<JobDescription>(
          url,
          { url: jdPdfUrl },
          { headers: { Authorization: `Bearer ${this.affindaToken}` } },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data)
            throw error
          }),
        ),
    )

    return data.meta.identifier
  }

  /**
   *
   * @param resumeId : Affinda ID of the candidate resume
   * @param jobId: Affinda ID of the job description
   * @returns
   */
  async matchResumeAgainstJobDescription(resumeId: string, jobId: string) {
    const url = `${this.affindaUrl}/resume_search/match?resume=${resumeId}&job_description=${jobId}`

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<ResumeSearchMatch>(url, {
            headers: { Authorization: `Bearer ${this.affindaToken}` },
          })
          .pipe(
            catchError((error) => {
              this.logger.error(error.response.data)
              throw error
            }),
          ),
      )
      return data
    } catch (e) {
      this.logger.error('Error in matching resume against job description', e)
    }
  }
}

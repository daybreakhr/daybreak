import { find } from 'lodash'
import type { Candidate } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { Injectable, Logger } from '@nestjs/common'
import { AffindaService } from 'src/affinda/affinda.service'
import { AuthService } from 'src/auth/auth.service'
import { AWSSESService } from 'src/aws/aws.ses.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class NotificationService {
  private logger = new Logger('HTTP')

  constructor(
    private affindaService: AffindaService,
    private authService: AuthService,
    private configService: ConfigService,
    private prismaService: PrismaService,
    private sesService: AWSSESService,
  ) {}

  async candidateAppliedNotification(jobId: string, candidate: Candidate) {
    try {
      const APPLICATION_SOURCE = this.configService.get<string>('BOARDS_URL')
      const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL')

      const { createdBy, title, Workspace } =
        await this.prismaService.job.findUnique({
          where: { id: jobId },
          include: { Workspace: true },
        })

      const resume = await this.affindaService.getParsedResume(
        candidate.affindaId,
      )
      const CurrOrganisationObj = find(
        resume.workExperience,
        (r) => r.dates.isCurrent,
      )

      const createdByUser = await this.authService.getUser(createdBy)
      const candidateName = `${candidate.firstName} ${candidate.lastName}`
      const candidateProfileUrl = `${FRONTEND_URL}/candidates/${candidate.id}`
      const boardsUrl = `${APPLICATION_SOURCE}/${Workspace.slug}/jobs/${jobId}`

      await this.sesService.sendMail({
        to: createdByUser.email,
        subject: `${candidateName} applied to your ${title} job on Daybreak HR`,
        body: `<p>Dear ${createdByUser.displayName}</p>

      <p>You have received a new application for Job Requisition ${title} through <a href=${boardsUrl}>Career Portal</a>.</p>

      <p>The candidate snapshot is as below -</p>

      <p>Name - ${candidateName}</p>

      <p>Current Company - ${CurrOrganisationObj.organization}</p>

      <p>Email - ${candidate.email}</p>

      <p>Phone - ${candidate.phone}</p>

      <p>For more information, please access the <a href=${candidateProfileUrl}>candidate profile</a> and proceed with the next steps.</p>

      <p>Regards<br />
      Daybreak admin</p>`,
      })
    } catch (error) {
      this.logger.error(error, 'Error sending candidate applied notification')
    }
  }
}

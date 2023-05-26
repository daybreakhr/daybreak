import { Express } from 'express'
import type { UserRecord } from 'firebase-admin/auth'
import type { Education, Experience } from '@prisma/client'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { ResumeData, ResumeDataWorkExperienceItem } from '@affinda/affinda'

import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { AffindaService } from 'src/affinda/affinda.service'
import { AuthService } from 'src/auth/auth.service'
import { NotificationService } from 'src/notification/notification.service'
import { CreateCandidateDto, UpdateCandidateDto } from './candidate.dto'

@Injectable()
export class CandidateService {
  constructor(
    private affindaService: AffindaService,
    private s3Service: AWSS3Service,
    private authService: AuthService,
    private notificationService: NotificationService,
    private prismaService: PrismaService,
  ) {}

  async getById(id: string) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
      include: { Job: { include: { Interview: true } } },
    })

    if (candidate.referredBy) {
      const user = await this.authService.getUser(candidate.referredBy)
      return { ...candidate, ReferredBy: user }
    }

    return { ...candidate, ReferredBy: null }
  }

  async getCalendarEventsForCandidate(candidateId: string) {
    const calendarEvents = await this.prismaService.calendar.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' },
    })

    return calendarEvents
  }

  async getCommentsForCandidate(candidateId: string) {
    const comments = await this.prismaService.comment.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' },
    })

    // get user object using `createdBy` field
    const identifiers = comments.map(({ createdBy }) => ({ uid: createdBy }))
    const users = await this.authService.getUsers(identifiers)
    const usersById = users.reduce(
      (acc, user) => ({ ...acc, [user.uid]: user }),
      {},
    )

    return comments.map((comment) => ({
      ...comment,
      User: usersById[comment.createdBy] as UserRecord,
    }))
  }

  async getEmailsForCandidate(candidateId: string) {
    const emailEvents = await this.prismaService.email.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' },
    })

    return emailEvents
  }

  async create(
    file: Express.Multer.File,
    createCandidateDto: CreateCandidateDto,
  ) {
    const { jobId, workspaceId, affindaId, ...restParams } = createCandidateDto

    const isApplied = await this.prismaService.candidate.findFirst({
      where: {
        email: createCandidateDto.email,
        phone: createCandidateDto.phone,
        jobId,
      },
    })

    if (isApplied) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "You've already applied for this job",
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const affindaData = await this.affindaService.getParsedResume(affindaId)

    const sortedExperiences =
      affindaData?.workExperience?.sort(
        (a, b) =>
          new Date(b.dates?.endDate ?? '').valueOf() -
          new Date(a.dates?.endDate ?? '').valueOf(),
      ) ?? []

    const education = this.getEducationDetails(affindaData)
    const experience = this.getExperienceDetails(sortedExperiences)

    const { id } = await this.prismaService.candidate.create({
      data: {
        ...restParams,
        affindaId,
        education,
        experience,
        currentCompany: sortedExperiences[0]?.organization,
        totalYearsOfExperience: affindaData.totalYearsExperience,
        skills: affindaData.skills.map(({ name }) => name),
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
      include: { Job: true },
    })

    const key = `candidate/${id}/${file.originalname}`
    const { Location } = await this.s3Service.uploadS3({
      file: file.buffer,
      key,
      mimetype: file.mimetype,
    })

    const candidate = await this.prismaService.candidate.update({
      where: { id },
      data: { resume: Location },
    })

    this.notificationService.candidateAppliedNotification(jobId, candidate)

    return candidate
  }

  async update(candidateId: string, updateCandidateDto: UpdateCandidateDto) {
    const candidate = this.prismaService.candidate.update({
      where: { id: candidateId },
      data: { ...updateCandidateDto },
    })

    return candidate
  }

  async delete(candidateId: string) {
    const candidate = await this.prismaService.candidate.delete({
      where: { id: candidateId },
    })
    return candidate
  }

  getEducationDetails(data: ResumeData): Education[] {
    return data.education.map((edu) => ({
      location: edu.location?.formatted,
      course: edu.accreditation?.education,
      startDate: new Date(edu.dates?.startDate),
      endDate: new Date(edu.dates?.completionDate),
      isCurrent: edu.dates.isCurrent,
      institute: edu?.organization,
    }))
  }

  getExperienceDetails(data: ResumeDataWorkExperienceItem[]): Experience[] {
    return data.map((exp) => ({
      location: exp.location?.formatted,
      company: exp?.organization,
      startDate: new Date(exp.dates?.startDate),
      endDate: new Date(exp.dates?.endDate),
      isCurrent: exp.dates.isCurrent,
      designation: exp?.jobTitle,
    }))
  }
}

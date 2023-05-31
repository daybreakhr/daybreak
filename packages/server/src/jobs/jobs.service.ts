import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { AffindaService } from 'src/affinda/affinda.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { PrismaService } from 'src/prisma.service'
import openai from 'src/utils/openai'
import generatePdf from 'src/utils/pdf-generator'
import { CreateJobDto, UpdateJob } from './jobs.dto'

@Injectable()
export class JobsService {
  private logger = new Logger('JOBS')
  constructor(
    private affindaService: AffindaService,
    private prismaService: PrismaService,
    private s3Service: AWSS3Service,
  ) {}

  async getAllJobs() {
    const jobs = await this.prismaService.job.findMany({
      where: { isPublished: true },
      include: { Workspace: true },
    })
    return jobs
  }

  async getById(id: string) {
    const job = await this.prismaService.job.findUnique({
      where: { id },
      include: { Location: true, Workspace: true },
    })
    return job
  }

  async getCandidatesByJobId(id: string) {
    const candidates = await this.prismaService.candidate.findMany({
      where: { jobId: id },
    })
    return candidates
  }

  async getInterviewsByJobId(id: string) {
    const interviews = await this.prismaService.interview.findMany({
      where: { jobId: id },
    })
    return interviews
  }

  async create(createJobDto: CreateJobDto, uid: string) {
    const { workspaceId } = createJobDto
    const job = await this.prismaService.job.create({
      data: {
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid } },
      },
    })
    return job
  }

  async generateJobDescription(title: string) {
    const prompt = `Generate a job description for "${title}" in the HTML format`

    try {
      const completion = await openai.createCompletion({
        prompt,
        model: 'text-davinci-003',
        max_tokens: 1000,
      })

      return completion.data.choices[0].text
    } catch (e) {
      this.logger.error(e)
      throw new HttpException({ error: e }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async parseJobDescription(jobId: string) {
    // Get job using id from DB
    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
      include: { Location: true },
    })

    // Generate pdf using puppeteer and html template
    const pdf = await generatePdf({
      title: job.title,
      location: job.Location.name,
      experience: job.experience,
      skills: job.skills,
      description: job.description,
    })

    // Upload pdf to S3
    const key = `jobs/${jobId}/${job.title}.pdf`
    const uploadResult = await this.s3Service.uploadS3({
      file: pdf,
      key,
      mimetype: 'application/pdf',
    })

    // Upload pdf url to affinda for document parsing
    const affindaId = await this.affindaService.uploadJobDescription(
      uploadResult.Location,
    )

    // Update job with pdf url and affindaId
    const updateJob = await this.prismaService.job.update({
      where: { id: jobId },
      data: {
        affindaId,
        jdPdfUrl: uploadResult.Location,
      },
    })

    return updateJob
  }

  async update(jobId: string, updateJobDto: UpdateJob) {
    if (updateJobDto) {
      const job = await this.prismaService.job.update({
        where: { id: jobId },
        data: updateJobDto,
      })
      return job
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Request body is not available',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}

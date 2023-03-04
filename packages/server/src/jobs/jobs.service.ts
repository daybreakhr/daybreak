import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Job } from '@prisma/client'
import openai from 'src/utils/openai'

@Injectable()
export class JobsService {
  private logger = new Logger('JOBS')
  constructor(private prismaService: PrismaService) {}

  async getAllJobs() {
    const jobs = await this.prismaService.job.findMany({
      where: { isPublished: true },
      include: { Workspace: true },
    })
    return jobs
  }

  async getAllByWorkspaceId(workspaceId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: { workspaceId },
      include: { Location: true, Department: true },
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

  async create(workspaceId: string, uid: string) {
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

  async update(jobId: string, updateJobDto: Partial<Job>) {
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

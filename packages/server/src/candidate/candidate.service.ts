import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AffindaCredential, AffindaAPI } from "@affinda/affinda";
import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { Candidate } from '@prisma/client'
import { CreateCandidateDto } from './candidate.dto'
import { find } from 'lodash';
import { AWSSESService } from 'src/aws/aws.ses.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CandidateService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: AWSS3Service,
    private sesService: AWSSESService,
    private firebaseService: FirebaseService,
    private configService: ConfigService
  ) {}

  async getAll(workspaceId: string) {
    const candidates = await this.prismaService.candidate.findMany({
      where: { workspaceId },
      include: { Job: true, Feedback: true },
    })

    return candidates
  }

  async getById(id: string) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
      include: { Job: true },
    })
    return candidate
  }

  async create(
    workspaceId: string,
    file: Express.Multer.File,
    createCandidateDto: CreateCandidateDto,
  ) {
    const { jobId, ...restParams } = createCandidateDto

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

    const { id } = await this.prismaService.candidate.create({
      data: {
        ...restParams,
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
    })

    const key = `candidate/${id}/${file.originalname}`
    const uploadResult = await this.s3Service.uploadS3(file, key)

    const candidate = await this.prismaService.candidate.update({
      where: { id },
      data: { resume: uploadResult.Location },
    })

    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    })

    const createdByUserData = await this.firebaseService.auth.getUser(job.createdBy)


    const data  = await this.getParsedResume(candidate.affindaId)

    const currentOrg = this.getLatestOrg(data.workExperience) || "None";

    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL')

    const CANDIDATE_PROFILE_URL = `${FRONTEND_URL}/candidates/${id}`;
    const APPLICATION_SOURCE = this.configService.get<string>('BOARDS_URL')

    const candidateName = `${candidate.firstName} ${candidate.lastName}`

    await this.sesService.sendMail({
      to: createdByUserData.email,
      subject: `${candidateName} applied to your ${job.title} job on Daybreak HR`,
      body: `<p>Dear ${createdByUserData.displayName}</p>

      <p>You have received a new application for Job Requisition ${job.title} through ${APPLICATION_SOURCE}.</p>
      
      <p>The candidate snapshot is as below -</p>
      
      <p>Name - ${candidateName}</p>
      
      <p>Current Company - ${currentOrg}</p>
      
      <p>Email - ${candidate.email}</p>
      
      <p>Phone - ${candidate.phone}</p>
      
      <p>
      For more information, please access the candidate profile at ${CANDIDATE_PROFILE_URL} and proceed with the next steps.</p>
      
      <p>Regards<br />
      Daybreak admin</p>`,
    })

    return candidate
  }

  getLatestOrg(workExp): string | undefined {
    const currentOrgObj = find(workExp, (obj) => {
      return obj.dates.isCurrent
    })

    if(currentOrgObj){
      return currentOrgObj.organization
    }
  }

  async getParsedResume(affindaId) {
    const AFFINDA_TOKEN = this.configService.get<string>('AFFINDA_TOKEN')

    const credential = new AffindaCredential(AFFINDA_TOKEN)
    const client = new AffindaAPI(credential)

    const { data } = await client.getResume(affindaId)

    return data;
  }

  async update(candidateId: string, updateCandidateDto: Partial<Candidate>) {
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
}

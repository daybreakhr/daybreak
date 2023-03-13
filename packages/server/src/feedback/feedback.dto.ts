import { IsNumber, IsString, IsOptional, IsInt } from 'class-validator'

export class CreateFeedbackDto {
  /**
   * title of feedback
   * @example 'Feedback 1'
   */
  @IsString()
  title: string

  /**
   * feedback notes
   * @example 'candidate has very good understanding of aws and cloud technologies'
   */
  @IsString()
  notes: string

  /**
   * feedback score
   * @example 4.5
   */
  @IsNumber()
  score: number
}

export class Feedback {
  /**
   * title of feedback
   * @example 'Feedback 1'
   */
  @IsString()
  title: string

  /**
   * feedback notes
   * @example 'candidate has very good understanding of aws and cloud technolgies'
   */
  @IsString()
  notes: string

  /**
   * feedback score
   * @example 4.5
   */
  @IsInt()
  score: number

  /**
   * Id of candidate
   * @example '83382e7332fac263632'
   * @readonly
   */
  @IsOptional()
  @IsString()
  candidateId?: string
}

import { IsNumber, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @IsString()
  title: string

  @IsString()
  notes: string

  @IsNumber()
  score: number
}

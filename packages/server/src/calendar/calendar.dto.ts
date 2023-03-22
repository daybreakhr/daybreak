import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsString } from 'class-validator'

export class CreateCalendarDto {
  @ApiProperty({
    example: 'Coding round (React Project)',
    description: 'Title of the calendar event',
  })
  @IsString()
  title: string

  @ApiProperty({
    example: '2022-08-28T09:00:00-07:00',
    description: 'start timestamp for the calendar event',
  })
  @IsString()
  startTime: string

  @ApiProperty({
    example: '2022-08-28T17:00:00-07:00',
    description: 'end timestamp for the calendar event',
  })
  @IsString()
  endTime: string

  @ApiProperty({
    example: ['himanshu@daybreakhire.com', 'raj@daybreakhire.com'],
    description: 'Email addresses of all the invited members',
  })
  @IsArray()
  @IsEmail({}, { each: true })
  attendees: string[]

  @IsString()
  candidateId: string
}

export class CalendarDto extends CreateCalendarDto {
  @ApiProperty({
    example: '632af2f17685417736bc0606',
    description: 'id from our database',
  })
  id: string

  @ApiProperty({
    example:
      'NjVnamFwMzFjZ3NqMmJiMjYxaW02YjlrYzhxbTZiOW9jY282YWI5aWNoaGphb2hpY2hnajRjOXBjNF8yMDIzMDEyNVQxNjMwMDBaIGhpbS5uYWdyYXRoQG0',
    description: 'EventID from google calendar',
  })
  @IsString()
  eventId: string
}

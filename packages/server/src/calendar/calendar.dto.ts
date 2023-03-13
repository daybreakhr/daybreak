import { IsArray, IsEmail, IsString } from 'class-validator'

export class CreateCalendarDto {
  /**
   * Title of the calendar event
   * @example 'Coding round (React Project)'
   */
  @IsString()
  title: string

  /**
   * start timestamp for the calendar event
   * @example '2022-08-28T09:00:00-07:00'
   */
  @IsString()
  startTime: string

  /**
   * end timestamp for the calendar event
   * @example '2022-08-29T09:00:00-07:00'
   */
  @IsString()
  endTime: string

  /**
   * Email addresses of all the invited members
   * @example ['himanshu@daybreakhire.com', 'raj@daybreakhire.com']
   */
  @IsArray()
  @IsEmail({}, { each: true })
  attendees: string[]
}

export class CalendarDto extends CreateCalendarDto {
  /**
   * Id of the calendar from our db
   * @example '632af2f17685417736bc0606'
   * @readonly
   */
  id: string

  /**
   * EventID from google calendar
   * @example 'NjVnamFwMzFjZ3NqMmJiMjYxaW02YjlrYzhxbTZiOW9jY282YWI5aWNoaGphb2hpY2hnajRjOXBjNF8yMDIzMDEyNVQxNjMwMDBaIGhpbS5uYWdyYXRoQG0'
   */
  @IsString()
  eventId: string
}

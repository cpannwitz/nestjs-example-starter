export class CreateEventDto {
  readonly title: string
  readonly author: number
  readonly categories?: string[]
  readonly location: number[]
  readonly startTime?: string
  readonly endTime?: string
  readonly description?: string
  readonly image?: string
  readonly isPrivate?: boolean
}

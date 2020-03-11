export interface Event {
  title: string
  author: number
  categories?: string[]
  location: [number, number]
  startTime?: Date
  endTime?: Date
  description?: string
  image?: string
  isPrivate?: boolean
  createdAt: Date
  updatedAt: Date
}

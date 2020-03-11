import { createParamDecorator } from '@nestjs/common'
// import { Request } from 'express'
import { Express } from '../../types/express'

export const RestUser = createParamDecorator((identifier: string, req: Express.Request) => {
  return identifier && req.user ? (req.user as any)[identifier] : req.user
})

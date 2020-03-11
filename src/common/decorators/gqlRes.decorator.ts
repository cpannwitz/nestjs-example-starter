import { createParamDecorator } from '@nestjs/common'
import { Response } from 'express'

export const GqlRes = createParamDecorator((data, [root, args, ctx, info]): Response => ctx.res)

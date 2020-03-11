import { createParamDecorator } from '@nestjs/common'
import { User } from '../../users/user.entity'

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req && ctx.req.user
)

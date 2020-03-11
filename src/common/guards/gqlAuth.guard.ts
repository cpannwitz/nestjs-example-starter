import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { AuthProvider } from '../../config/auth.config'

function getRequestBlueprint(context: ExecutionContext) {
  return GqlExecutionContext.create(context).getContext().req
}

// * +------------------------------------------+
// * |          AUTHENTICATION: JWT             |
// * +------------------------------------------+

@Injectable()
export class GqlAuthGuardJwt extends AuthGuard(AuthProvider.JWT) {
  getRequest = getRequestBlueprint
}

// * +------------------------------------------+
// * |          AUTHENTICATION: GOOGLE          |
// * +------------------------------------------+

@Injectable()
export class GqlAuthGuardGoogle extends AuthGuard(AuthProvider.GOOGLE) {
  getRequest = getRequestBlueprint
}
@Injectable()
export class GqlAuthGuardGoogleToken extends AuthGuard(AuthProvider.GOOGLETOKEN) {
  getRequest = getRequestBlueprint
}

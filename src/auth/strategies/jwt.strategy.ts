import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { JwtPayload } from '../auth.types'
import { PinoLogger } from 'nestjs-pino'
import { AuthProvider } from '../../config/auth.config'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthProvider.JWT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret')
      // passReqToCallback: true
    })
    logger.setContext(JwtStrategy.name)
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload.sub)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

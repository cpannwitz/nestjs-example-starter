import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-token'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { AuthProvider } from '../../config/auth.config'
import { Profile } from 'passport'
import { PinoLogger } from 'nestjs-pino'

// Organize oauth client-id and client-secret
// https://console.developers.google.com/

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(Strategy, AuthProvider.GOOGLETOKEN) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {
    super(configService.get('auth.googletoken'))
    logger.setContext(GoogleTokenStrategy.name)
  }

  async validate(
    // req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile
    // done: Function
  ) {
    const user = await this.authService.upsertSocialUser(profile, AuthProvider.GOOGLE)

    if (!user) {
      throw new UnauthorizedException('Failed to upsert user.')
    }

    return user
  }
}

import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Profile } from 'passport'
import { JwtPayload } from './auth.types'
import { UsersService } from '../users/users.service'
import { AuthProvider } from '../config/auth.config'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async upsertSocialUser(profile: Profile, provider: AuthProvider) {
    try {
      let user = await this.usersService.findOneByParams({ provider, providerId: profile.id })
      if (!user) {
        user = await this.usersService.createOne({
          username: profile.displayName,
          image: profile.photos ? profile.photos[0].value : null,
          email: profile.emails ? profile.emails[0].value : undefined,
          // verified: // TODO: get verified from different providers
          providerId: profile.id,
          provider: provider
        })
      }

      return user
    } catch (error) {
      throw new InternalServerErrorException('Failed to create social user.', error.message)
    }
  }

  async validateUser(id: string) {
    try {
      return await this.usersService.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user.', error.message)
    }
  }

  async createAuthTokens(userId: string) {
    const accessToken = await this.signToken({ sub: userId })
    const refreshToken = await this.signToken(
      { sub: userId },
      this.configService.get('auth.jwtRefresh.signOptions')
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshToken(
    oldRefreshToken?: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!oldRefreshToken) {
      throw new BadRequestException('Missing refreshToken.')
    }

    try {
      const payload = await this.validateToken(oldRefreshToken)
      const { accessToken, refreshToken } = await this.createAuthTokens(payload.sub)
      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', error.message)
    }
  }

  async signToken(payload: any, options?: {}) {
    return this.jwtService.signAsync(payload, options)
  }
  async validateToken(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token)
  }
}

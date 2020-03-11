import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Post,
  Body,
  InternalServerErrorException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Redirect } from '@nestjsplus/redirect'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

import { AuthService } from './auth.service'

import { AuthProvider } from '../config/auth.config'
import { RestUser } from '../common/decorators/restUser.decorator'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { User } from '../users/user.entity'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  // * +------------------------------------------+
  // * |          AUTHENTICATION: JWT             |
  // * +------------------------------------------+

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto.refreshToken)
  }

  // * +------------------------------------------+
  // * |          AUTHENTICATION: GOOGLE          |
  // * +------------------------------------------+

  @Get(AuthProvider.GOOGLE)
  @UseGuards(AuthGuard(AuthProvider.GOOGLE))
  async loginGoogle() {
    // initiates the Google OAuth2 login flow via Passport-Strategy
  }

  @ApiExcludeEndpoint()
  @Redirect()
  @UseGuards(AuthGuard(AuthProvider.GOOGLE))
  @Get(AuthProvider.GOOGLE + '/callback')
  async loginGoogleCallback(@RestUser() user: User) {
    if (!user) {
      throw new InternalServerErrorException('User not found.')
    }
    const { accessToken, refreshToken } = await this.authService.createAuthTokens(user.id)

    const loginSuccessUrl = this.configService.get('auth.loginSuccessUrl')
    return {
      statusCode: HttpStatus.FOUND,
      url: `${loginSuccessUrl}?jwt=${accessToken}&jwtrefresh=${refreshToken}`
    }
  }

  // * +------------------------------------------+
  // * |        AUTHENTICATION: GOOGLETOKEN       |
  // * +------------------------------------------+

  @Post(AuthProvider.GOOGLETOKEN)
  @UseGuards(AuthGuard(AuthProvider.GOOGLETOKEN))
  async loginGoogleToken(@RestUser() user: User) {
    if (!user) {
      throw new InternalServerErrorException('User not found.')
    }
    return await this.authService.createAuthTokens(user.id)
  }
}

import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  // when visiting default server address, get redirected to client app website
  @Get()
  defaultRoute(@Res() res: Response) {
    const clientURI = this.config.get('system.clientURI')
    res.redirect(clientURI)
  }
}

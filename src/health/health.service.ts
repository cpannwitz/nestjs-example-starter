import { Injectable } from '@nestjs/common'
import {
  TerminusOptionsFactory,
  TerminusEndpoint,
  TerminusModuleOptions,
  DNSHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'

@Injectable()
export class HealthService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly db: TypeOrmHealthIndicator
  ) {}

  public createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('dns', 'https://google.com'),
        async () => this.db.pingCheck('postgres', { timeout: 1000 })
      ]
    }
    return {
      endpoints: [healthEndpoint]
    }
  }
}

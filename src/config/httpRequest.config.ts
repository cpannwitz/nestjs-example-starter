import { HttpModuleOptions } from '@nestjs/common'
import { registerAs } from '@nestjs/config'

// TODO: add more specific config for axios

export default registerAs(
  'httpRequest',
  () =>
    ({
      timeout: 5000,
      maxRedirects: 5
    } as HttpModuleOptions)
)

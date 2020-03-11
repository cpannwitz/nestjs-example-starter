import { Params } from 'nestjs-pino'
import { RequestMethod } from '@nestjs/common'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'logger',
  () =>
    ({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV === 'development' ? true : false
      },
      /**
       * Optional parameters for `pino-http` module
       * @see https://github.com/pinojs/pino-http#pinohttpopts-stream
       */
      // pinoHttp?:
      // | pinoHttp.Options
      // | DestinationStream
      // | [pinoHttp.Options, DestinationStream];
      /**
       * Optional parameter for routing. It should implement interface of
       * parameters of NestJS buil-in `MiddlewareConfigProxy['forRoutes']`.
       * @see https://docs.nestjs.com/middleware#applying-middleware
       * It can be used for disabling automatic req/res logs (see above).
       * Keep in mind that it will remove context data from logs that are called
       * inside not included or excluded routes and controlles.
       */
      // forRoutes?: Parameters<MiddlewareConfigProxy["forRoutes"]>;
      forRoutes: [
        {
          method: RequestMethod.ALL,
          path: 'auth'
        }
      ]
      /**
       * Optional parameter for routing. It should implement interface of
       * parameters of NestJS buil-in `MiddlewareConfigProxy['exclude']`.
       * @see https://docs.nestjs.com/middleware#applying-middleware
       * It can be used for disabling automatic req/res logs (see above).
       * Keep in mind that it will remove context data from logs that are called
       * inside not included or excluded routes and controlles.
       */
      // exclude?: Parameters<MiddlewareConfigProxy["exclude"]>;
      /**
       * Optional parameter to skip `pino` configuration in case you are using
       * Fastify adapter, and already configuring it on adapter level.
       * Pros and cons of this approach are descibed in the last section.
       */
      // useExisting?: true;
      /**
       * Optional parameter to change property name `context` in resulted logs,
       * so logs will be like:
       * {"level":30, ... "RENAME_CONTEXT_VALUE_HERE":"AppController" }
       * Works with both `Logger` and `PinoLogger`
       */
      // renameContext?: string;
    } as Params)
)

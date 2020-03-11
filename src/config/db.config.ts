import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default () => ({
  database: {
    url: process.env.DATABASE_URL,
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
  },
  typeorm: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: !process.env.IS_LOCAL,
    synchronize: false,
    dropSchema: false,
    logging: true,
    migrationsRun: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../_db/subscribers/**/*.{.ts,.js}'],
    migrations: [__dirname + '/../_db/migrations/**/*{.ts,.js}']
  } as TypeOrmModuleOptions
})

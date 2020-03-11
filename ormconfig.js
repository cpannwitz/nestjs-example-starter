require('dotenv/config')

const { DATABASE_URL, DATABASE_URL_EXT, TEST_DATABASE_URL_EXT, IS_LOCAL, NODE_ENV } = process.env
const BASE_DIR = NODE_ENV === 'production' ? 'dist' : 'src'
const BASE_EXT = NODE_ENV === 'production' ? '.js' : '.ts'
const BASE_URL =
  NODE_ENV === 'production'
    ? DATABASE_URL
    : NODE_ENV === 'test'
    ? TEST_DATABASE_URL_EXT
    : DATABASE_URL_EXT

module.exports = {
  type: 'postgres',
  url: BASE_URL,
  ssl: !IS_LOCAL,
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: [`${BASE_DIR}/**/*.entity${BASE_EXT}`],
  migrations: [`${BASE_DIR}/_db/migrations/**/*${BASE_EXT}`],
  subscribers: [`${BASE_DIR}/_db/subscribers/**/*${BASE_EXT}`],
  cli: {
    'entitiesDir': 'src',
    'migrationsDir': 'src/_db/migrations',
    'subscribersDir': 'src/_db/subscribers'
  }
}

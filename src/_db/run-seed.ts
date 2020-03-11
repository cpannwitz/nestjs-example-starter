import 'dotenv/config'

import { createConnection } from 'typeorm'

import seed from './seed'

const main = async () => {
  const connection = await createConnection()
  await seed(connection)
  await connection.close()
}

main()

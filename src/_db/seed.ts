import { Connection } from 'typeorm'

import { User } from '../users/user.entity'
import { AuthProvider } from '../config/auth.config'

const seed = async (connection: Connection) => {
  await connection.transaction(async transactionalEntityManager => {
    await transactionalEntityManager.delete(User, {})

    const user = transactionalEntityManager.create(User, {
      username: 'testname',
      email: 'test@email.de',
      providerId: '123',
      provider: AuthProvider.GOOGLE,
      roles: ['user']
    })
    await transactionalEntityManager.save(user)
  })
}

export default seed

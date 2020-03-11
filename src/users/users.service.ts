import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository, DeleteResult } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  // ? Single Entity Operations
  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id)
  }

  findOneByParams(user: Partial<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(user)
  }

  createOne(data: Partial<User>): Promise<User | undefined> {
    const user = this.usersRepository.create(data)
    return this.usersRepository.save(user)
  }

  async updateOne(id: string, data: Partial<User>): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id)
    if (user) {
      this.usersRepository.merge(user, data)
      return this.usersRepository.save(user)
    }
  }

  removeOne(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }

  // ? Multi Entity Operations
  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  // async upsertOne(): Promise<User> {
  // const user = await this.findOne(id)
  // const user = await this.usersService.findOne({ oAuthLogins: { provider, providerId: profile.id } });
  // if (!user) { user = await this.usersService.registerOAuthUser( new CreateOAuthUserDto ({ provider, providerId: profile.id })); }
  // }

  // ! TRANSACTION EXAMPLE
  // async createMany(users: User[]) {
  //   const queryRunner = this.connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.save(users[0]);
  //     await queryRunner.manager.save(users[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }
}

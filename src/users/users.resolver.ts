import { UseGuards, InternalServerErrorException } from '@nestjs/common'
import { Query, Resolver, Args } from '@nestjs/graphql'

import { User } from './user.entity'
import { UsersService } from './users.service'

import { GqlAuthGuardJwt } from '../common/guards/gqlAuth.guard'
import { GqlUser } from '../common/decorators/gqlUser.decorator'

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuardJwt)
  @Query(_returns => User)
  public async getUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @UseGuards(GqlAuthGuardJwt)
  @Query(_returns => User)
  public async getMe(@GqlUser() user: User) {
    if (!user) {
      throw new InternalServerErrorException('User not found.')
    }
    return user
  }
}

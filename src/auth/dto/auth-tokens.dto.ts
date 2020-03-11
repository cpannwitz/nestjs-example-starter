import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AuthTokensDto {
  @Field(_type => String)
  accessToken: string

  @Field(_type => String)
  refreshToken: string
}

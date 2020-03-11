import { IsJWT } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class RefreshTokenDto {
  @IsJWT()
  @Field()
  refreshToken: string
}

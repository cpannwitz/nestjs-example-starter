import { JwtPayload } from '../auth/auth.types'

declare namespace Express {
  export interface Request {
    user?: User
    jwtPayload?: JwtPayload
  }

  export interface User {
    id?: string
    // accessToken?: string
    // refreshToken?: string
  }
}

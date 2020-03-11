import { registerAs } from '@nestjs/config'
import { rule, shield, and, not } from 'graphql-shield'

export default registerAs('graphqlAccessControl', () => {
  const isPublic = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => true)

  const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.req && ctx.req.user !== null ? true : false
  })

  const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.req && ctx.req.user && (ctx.req.user.roles as any[]).includes('admin ')
  })

  const permissions = shield({
    Query: {
      getUser: and(isAuthenticated, isAdmin),
      getMe: isAuthenticated
    },
    Mutation: {
      refreshToken: isPublic,
      loginGoogleToken: isPublic
    },
    User: isAuthenticated
  })

  return permissions
})

import { registerAs } from '@nestjs/config'
import { RolesBuilder } from 'nest-access-control'

export enum ACLRoles {
  user = 'user',
  organisation = 'organisation',
  moderator = 'moderator',
  admin = 'admin'
}

export enum ACLResources {
  user = 'user',
  event = 'event'
}

// TODO: https://github.com/maticzav/graphql-shield/issues/213

// Documentation:
// https://github.com/nestjsx/nest-access-control
// https://github.com/onury/accesscontrol

// TODO: find out, how to apply for graphql

// implement into app.module.ts
// AccessControlModule.forRootAsync({
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => config.get('accessControl') || ({} as RolesBuilder)
// }),

export default registerAs('accessControl', () => {
  const roles: RolesBuilder = new RolesBuilder()

  roles
    // User
    .grant(ACLRoles.user)
    .readOwn(ACLResources.user)
    .updateOwn(ACLResources.user)
    .grant(ACLRoles.organisation)
    .extend(ACLRoles.user)
    .grant(ACLRoles.moderator)
    .extend(ACLRoles.user)
    .readAny(ACLResources.user)
    .updateAny(ACLResources.user)
    .grant(ACLRoles.admin)
    .extend(ACLRoles.moderator)
    .readAny(ACLResources.user)
    .createAny(ACLResources.user)
    .updateAny(ACLResources.user)
    .deleteAny(ACLResources.user)
    // Events
    .grant(ACLRoles.user)
    .readAny(ACLResources.event)
    .createAny(ACLResources.event)
    .updateOwn(ACLResources.event)
    .deleteOwn(ACLResources.event)
    .grant(ACLRoles.organisation)
    .extend(ACLRoles.user)
    .grant(ACLRoles.moderator)
    .extend(ACLRoles.user)
    .readAny(ACLResources.event)
    .createAny(ACLResources.event)
    .updateAny(ACLResources.event)
    .deleteAny(ACLResources.event)
    .grant(ACLRoles.admin)
    .extend(ACLRoles.moderator)

  return roles
})

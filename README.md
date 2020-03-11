# NestJS Example Starter
This server boilerplate is built with [NestJS](https://nestjs.com/) and the [Express](https://expressjs.com/de/) adapter.
Also it includes compatible submodules to work with:
- TypeORM -> **Postgres**
- Apollo-Express-Server -> **GraphQL**
- Swagger -> **REST Documentation**
- Redis (currently unused)

## Tooling
Docker-Compose and Docker are used to setup and run the NestJS server locally and on the target system.
Also there are instances of following services started locally:
- Postgres
- Postgres-Test
- pgAdmin
- Redis

Additionally, Gitlab CI is used to deploy the built image.

> Additional scripts can be found in package.json.

## Deployment / Workflow
1. Fill in `.env` according to `.env.example`, for all services and configs
2. Run `yarn start:docker:full` if you want to use Docker, or `yarn start:dev` standalone.
3. To stop Docker, run `yarn stop:docker`
4. If there are database schema changes, run `yarn migrations:generate` with the docker instance running, to generate needed migrations.
5. To apply migrations locally, run `yarn migrations:run:dev`
6. Git commit and push changes, Gitlab CI will build the image and send it right to the deployment destination.

> For successful deploy you need to provide your HEROKU_API_KEY to gitlab CI env variables!

## Authentication
There are two ways of authentication available, which are both resulting in exchanging social auth provider access token for a JWT Token, which is used primarily for authentication:

- **OAuth Implicit Flow** for Google Login (REST & GraphQL)
- **OAuth Authorization Code Flow** for Google Login (only REST)

## Authorization
Based on roles saved on the user record, there are two ways of authorization used:

- **Nest-Access-Control** (REST)
- **GraphQL-Shield** (GraphQL)

## Configuration
Configuration files for all kinds of services and modules are found in `src/config`, which are loaded by @nestjs/config.

## REST vs GraphQL
REST is primarily used for OAuth Authorization Code Flow, which needs callbacks.
GraphQL is primarily used for everything else, which is API related.

## Additional Modules
- Health checks via Terminus
- User module for authentication
- Basic Event module for data entities

## Todo
- Tests
- use Redis
- more GraphQL functionality
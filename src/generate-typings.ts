import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'

// ! Important:
// This function is used to generate Typescript classes based on all
// graphql schemas found in project folder, to assist the
// SCHEMA-FIRST approach in NestJS-GraphQL

const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.schema.ts'),
  outputAs: 'class',
  watch: true
})

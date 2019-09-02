import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { loader } from './utils/loader';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    ...loader(__dirname, 'module.ts'),
  ],
})
export class AppModule {}

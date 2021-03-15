import { SharedModule } from '@microservices-realworld-example-app/shared';
import { AuthModule } from '@microservices-realworld-example-app/auth';
import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserResolver } from './resolvers/user.resolver';
import { ExtendedGqlExecutionContext } from './extended-gql-context';

@Module({
  imports: [
    HttpModule,
    SharedModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res, payload, connection }): ExtendedGqlExecutionContext => ({
        req,
        res,
        payload,
        connection,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
  ],
})
export class AppModule {}

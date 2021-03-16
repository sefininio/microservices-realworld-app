import { SharedModule } from '@microservices-realworld-example-app/shared';
import { AuthModule } from '@microservices-realworld-example-app/auth';
import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserResolver } from './resolvers/user.resolver';
import { ExtendedGqlExecutionContext } from './extended-gql-context';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        "Accept": '*/*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Connection": "keep-alive",
      }
    }),
    SharedModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/realworld-example-app/schema.gql'),
      sortSchema: true,
      context: ({ req, res, payload, connection }): ExtendedGqlExecutionContext => ({
        req,
        res,
        payload,
        connection,
        token: req.headers.token,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    UserService,
    ArticleService,
  ],
})
export class AppModule {}

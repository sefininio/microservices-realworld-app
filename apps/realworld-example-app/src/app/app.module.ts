import { SharedModule } from '@microservices-realworld-example-app/shared';
import { AuthModule } from '@microservices-realworld-example-app/auth';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserResolver } from './resolvers/user.resolver';
import { ExtendedGqlExecutionContext } from './extended-gql-context';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { ArticleResolver } from './resolvers/article.resolver';
import { ProfileService } from './services/profile.service';
import { ProfileResolver } from './resolvers/profile.resolver';
import { CommentResolver } from './resolvers/comment.resolver';
import { LoginResolver } from './resolvers/login.resolver';

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
      autoSchemaFile: './schema.graphql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
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
    ArticleResolver,
    ArticleService,
    ProfileResolver,
    ProfileService,
    CommentResolver,
    LoginResolver,
  ],
})
export class AppModule {}

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import * as path from 'path';
import articleResolvers from './app/resolvers/article.resolvers';
import CommentResolvers from './app/resolvers/comment.resolvers';
import LoginResolvers from './app/resolvers/login.resolvers';
import ProfieResolvers from './app/resolvers/profile.resolvers';
import UserResolvers from './app/resolvers/user.resolvers';

const typesArray = loadFilesSync(
  path.join(__dirname, '../../../apps/gateway/src/app/**/*.graphql')
);
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = [
  articleResolvers,
  CommentResolvers,
  LoginResolvers,
  ProfieResolvers,
  UserResolvers
];
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    // get the user token from the headers
    const token = req.headers.token || '';

    // try to retrieve a user with the token
    // const user = getUser(token);

    // optionally block the user
    // we could also check user roles/permissions here
    // if (!user) throw new AuthenticationError('you must be logged in');

    // add the user to the context
    // return { user };
    return {
      req,
      res,
      authHeader: {
        "Authorization": `Bearer ${token}`,
      }
    }
   },
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

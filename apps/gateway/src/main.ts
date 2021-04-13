import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import * as path from 'path';

const typesArray = loadFilesSync(
  path.join(__dirname, '../../../apps/gateway/src/app/**/*.graphql')
);
const typeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs,
});

const server = new ApolloServer({
  schema,
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

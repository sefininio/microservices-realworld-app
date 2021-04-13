import { getUserArticles, getUserFeed } from '../services/article.service';
import {
  create as createUser,
  getMe,
  getUser,
  update as updateUser
} from '../services/user.service';

const resolvers = {
  Query: {
    user: (_, args) => getUser(args.id, args.username, args.email),
    me: (_, __, ctx) => getMe(ctx.authHeader),
  },
  Mutation: {
    createUser: (_, args) => createUser(args.createUserData),
    updateUser: (_, args, ctx) => updateUser(args.updateUserData, ctx.authHeader),
  },
  User: {
    articles: user => getUserArticles(user.username),
    feed: (_, __, ctx) => getUserFeed(ctx.authHeader),
  }
}

export default resolvers;

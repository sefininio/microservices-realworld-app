import { addFollow, getProfile, removeFollow } from '../services/profile.service';

const resolvers = {
  Query: {
    profile: (_, args, ctx) => getProfile(args.username, ctx.authHeader),
  },
  Mutation: {
    addFollow: (_, args, ctx) => addFollow(args.username, ctx.authHeader),
    removeFollow: (_, args, ctx) => removeFollow(args.username, ctx.authHeader),
  },
}

export default resolvers;

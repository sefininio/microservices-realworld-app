import { login } from '../services/user.service';

const resolvers = {
  Mutation: {
    login: (_, args) => login(args.loginData),
  },
}

export default resolvers;

import {
  createComment,
  deleteComment
} from '../services/article.service';
import { getUser } from '../services/user.service';

const resolvers = {
  Mutation: {
    createComment: (_, args, ctx) => createComment(args.createCommentData, ctx.authHeader),
    deleteComment: (_, args, ctx) => deleteComment(args.deleteCommentData, ctx.authHeader),
  },
  Comment: {
    author: comment => getUser(comment.authorId),
  }
}

export default resolvers;

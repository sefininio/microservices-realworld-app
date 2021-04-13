import getArticlesResolver from './article/getArticles.resolver';
import {
  addFavorite,
  create as createArticle,
  getArticleComments,
  remove as removeArticle,
  removeFavorite,
  update as updateArticle
} from '../services/article.service';
import { getUser } from '../services/user.service';

const resolvers = {
  Query: {
    articles: getArticlesResolver,
  },
  Mutation: {
    addFavorite: (_, args, ctx) => addFavorite(args.slug, ctx.authHeader),
    createArticle: (_, args, ctx) => createArticle(args.createArticleData, ctx.authHeader),
    updateArticle: (_, args, ctx) => updateArticle(args.updateArticleData, ctx.authHeader),
    deleteArticle: (_, args, ctx) => removeArticle(args.slug, ctx.authHeader),
    removeFavorite: (_, args, ctx) => removeFavorite(args.slug, ctx.authHeader),
  },
  Article: {
    author: article => getUser(article.authorId),
    comments: article => getArticleComments(article.slug),
  }
}

export default resolvers;

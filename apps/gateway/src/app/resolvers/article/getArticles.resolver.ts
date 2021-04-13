import { getAllArticles, getArticle } from '../../services/article.service';

const getArticlesResolver = (_, args) => {
  if (args.slug) {
    return getArticle(args.slug);
  } else {
    return getAllArticles();
  }};

export default getArticlesResolver;

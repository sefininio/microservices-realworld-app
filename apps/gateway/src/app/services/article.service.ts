import axios from 'axios';

const articleFeatureBaseUrl = 'http://localhost:3337/api';

export const getArticle = async (slug) => {
  const url = `${articleFeatureBaseUrl}/articles/${slug}`;
  const article = await axios.get(url);
  return [article.data];
}

export const getAllArticles = async () => {
  const url = `${articleFeatureBaseUrl}/articles`;
  const articles = await axios.get(url);
  return articles.data;
}

export const getUserArticles = async (username) => {
  const url = `${articleFeatureBaseUrl}/articles?author=${username}`;
  const articles = await axios.get(url);
  return articles.data;
}

export const getUserFeed = async (authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/feed`;
  const articles = await axios.get(url, { headers: authHeader });
  return articles.data;
}

export const getArticleComments = async (slug) => {
  const url = `${articleFeatureBaseUrl}/articles/${slug}/comments`;
  const comments = await axios.get(url);
  // todo: this is a good use case for dataloader
  return comments.data;
}

export const create = async (input, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles`;
  const article = await axios.post(url, input, { headers: authHeader });
  return article.data;
}

export const update = async (input, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/${input.slug}`;
  const article = await axios.put(url, input, { headers: authHeader });
  return article.data;
}

export const remove = async (slug, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/${slug}`;
  const article = await axios.delete(url, { headers: authHeader });
  return article.data;
}

export const createComment = async (input, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/${input.slug}/comments`;
  const comment = await axios.post(url, input, { headers: authHeader });
  return comment.data;
}

export const deleteComment = async (input, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/${input.slug}/comments/${input.id}`;
  const comment = await axios.delete(url, { headers: authHeader });
  return comment.data;
}

export const addFavorite = async (slug, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/${slug}/favorite`;
  const article = await axios.post(url, {}, { headers: authHeader });
  return article.data;
}

export const removeFavorite = async (slug, authHeader) => {
  const url = `${articleFeatureBaseUrl}/articles/${slug}/favorite`;
  const article = await axios.delete(url, { headers: authHeader });
  return article.data;
}
